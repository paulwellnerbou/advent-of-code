package day5

import (
	"advent-of-code-2020/common"
	"fmt"
	"strconv"
	"strings"
)

type Bag struct {
	color    string
	contains []BagRule
}

func (b Bag) MayContain(color string) bool {
	for _, containedBag := range b.contains {
		if containedBag.bag.color == color {
			return true
		}
	}
	return false
}

type BagRule struct {
	bag      Bag
	quantity int
}

type Catalog struct {
	bags map[string]Bag
}

func (c Catalog) getBag(color string) Bag {
	bag, _ := c.bags[color]
	return bag
}

func (c Catalog) bag(color string, bagRules []BagRule) Bag {
	if bag, ok := c.bags[color]; ok {
		bag.contains = append(bag.contains, bagRules...)
		c.bags[color] = bag
		return bag
	} else {
		bag := Bag{
			color:    color,
			contains: bagRules,
		}
		c.bags[color] = bag
		return bag
	}
}

func (c Catalog) howManyBagsAreRequiredInBagOfColor(bagColor string) int {
	count := 0
	for _, bagRule := range c.getBag(bagColor).contains {
		count += bagRule.quantity
		count += c.howManyBagsAreRequiredInBagOfColor(bagRule.bag.color) * bagRule.quantity
	}
	return count
}

func (c Catalog) findAllBagsThatMayContainAtLeastOneBagOfColor(bagColor string) []Bag {
	var bags []Bag
	for _, bag := range c.bags {
		if bag.MayContain(bagColor) && !ContainsBagOfSameColor(bags, bag) {
			bags = append(bags, bag)
			for _, b := range c.findAllBagsThatMayContainAtLeastOneBagOfColor(bag.color) {
				if !ContainsBagOfSameColor(bags, b) {
					bags = append(bags, b)
				}
			}
		}
	}
	return bags
}

func ContainsBagOfSameColor(bags []Bag, bag Bag) bool {
	for _, b := range bags {
		if b.color == bag.color {
			return true
		}
	}
	return false
}

func readCatalog(input string) Catalog {
	catalog := Catalog{bags: map[string]Bag{}}
	for _, line := range common.ReadInput(input) {
		BagRulesFromLine(line, catalog)
	}
	return catalog
}

func BagRulesFromLine(line string, catalog Catalog) Bag {
	bagAndRule := strings.Split(line, " bags contain ")
	split := strings.Split(strings.ReplaceAll(strings.ReplaceAll(strings.ReplaceAll(bagAndRule[1], " bags", ""), " bag", ""), ".", ""), ", ")
	return catalog.bag(strings.TrimSpace(bagAndRule[0]), RulesFrom(split, catalog))
}

func RulesFrom(parsedStrings []string, catalog Catalog) []BagRule {
	var bagRules []BagRule
	for _, str := range parsedStrings {
		if !strings.Contains(str, "no other") {
			bagRules = append(bagRules, RuleFrom(strings.TrimSpace(str), catalog))
		}
	}
	return bagRules
}

func RuleFrom(parsedString string, catalog Catalog) BagRule {
	rule := strings.SplitAfterN(parsedString, " ", 2)
	atoi, err := strconv.Atoi(strings.TrimSpace(rule[0]))
	if err != nil {
		fmt.Errorf("unable to convert string to number: %s", rule[0])
	}
	return BagRule{
		bag:      catalog.bag(strings.TrimSpace(rule[1]), []BagRule{}),
		quantity: atoi,
	}
}