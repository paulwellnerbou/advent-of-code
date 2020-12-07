
print("Part One: ", sum([len(set(p)) for p in [p.replace("\n", "") for p in open('input', 'r').read().split("\n\n")]]))
print("Part Two: ", sum(x for x in [len(set(n[0]).intersection(*n)) for n in [[list(l) for l in p] for p in [list(p.split("\n")) for p in open('input', 'r').read().split("\n\n")]]]))