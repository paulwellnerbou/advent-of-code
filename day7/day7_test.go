package day5

import (
	"reflect"
	"testing"
)

func TestCatalogReadCatalog(t *testing.T) {
	catalog := readCatalog("testinput")
	if len(catalog.getBag("light red").contains) != 2 {
		t.Errorf("Expected %v to contain two other bags, but found %v", "light red", catalog.getBag("light red"))
	}
	if len(catalog.getBag("dark orange").contains) != 2 {
		t.Errorf("Expected %v to contain two other bags, but found %v", "dark orange", catalog.getBag("dark orange"))
	}
	if len(catalog.getBag("bright white").contains) != 1 {
		t.Errorf("Expected %v to contain two other bags, but found %v", "bright white", catalog.getBag("bright white"))
	}
}

func TestCatalog_howManyBagsAreRequiredInBagOfColor(t *testing.T) {
	catalog := readCatalog("testinput")
	count := catalog.howManyBagsAreRequiredInBagOfColor("shiny gold")

	if count != 32 {
		t.Errorf("Expected to find 126 bags, but found %d", count)
	}
}

func TestCatalog_findAllBagsThatMayContainAtLeastOneBagOfColor(t *testing.T) {
	catalog := readCatalog("input")
	bags := catalog.findAllBagsThatMayContainAtLeastOneBagOfColor("shiny gold")

	if len(bags) != 4 {
		t.Errorf("Expected to find 4 bags, but found %d: %v", len(bags), bags)
		for _, b := range bags {
			t.Errorf("%v", b)
		}
	}
}

func TestBagRulesFromLine(t *testing.T) {
	emptyCatalog := Catalog{bags: map[string]Bag{}}
	catalogWithOneBag := Catalog{bags: map[string]Bag{
		"dotted black": {
			color:    "dotted black",
			contains: []BagRule{
				{bag: Bag{color: "faded blue"}, quantity: 1},
			},
		},
		"faded blue": {
			color:    "faded blue",
		},
	}}
	tests := []struct {
		name string
		line string
		catalog Catalog
		want Bag
	}{
		{"", "light red bags contain 1 bright white bag, 2 muted yellow bags.", emptyCatalog, Bag{
			color:    "light red",
			contains: []BagRule{
				{bag: Bag{color: "bright white"}, quantity: 1},
				{bag: Bag{color: "muted yellow"}, quantity: 2},
			},
		}},
		{"", "dark olive bags contain 3 faded blue bags, 4 dotted black bags.", catalogWithOneBag, Bag{
			color:    "dark olive",
			contains: []BagRule{
				{bag: catalogWithOneBag.bags["faded blue"], quantity: 3},
				{bag: catalogWithOneBag.bags["dotted black"], quantity: 4},
			},
		}},
		{"", "bright white bags contain 1 shiny gold bag.", emptyCatalog, Bag{
			color:    "bright white",
			contains: []BagRule{
				{bag: Bag{color: "shiny gold", contains: []BagRule{}}, quantity: 1},
			},
		}},
		{"", "faded blue bags contain no other bags.", catalogWithOneBag, Bag{
			color:    "faded blue",
		}},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := BagRulesFromLine(tt.line, tt.catalog); !reflect.DeepEqual(got, tt.want) {
				t.Errorf("BagRulesFromLine('%v') = '%v', want '%v'", tt.line, got, tt.want)
			}
		})
	}
}

func TestRuleFrom(t *testing.T) {
	tests := []struct {
		name string
		arg string
		want BagRule
	}{
		{ "", "2 muted yellow", BagRule{
			bag:      Bag{color: "muted yellow"},
			quantity: 2,
		}},
	}
		for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := RuleFrom(tt.arg, Catalog{bags: map[string]Bag{}}); !reflect.DeepEqual(got, tt.want) {
				t.Errorf("RuleFrom(%v) = %v, want %v", tt.arg, got, tt.want)
			}
		})
	}
}
