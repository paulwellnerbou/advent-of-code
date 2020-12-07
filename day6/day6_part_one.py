
print(sum([len(set(p)) for p in [p.replace("\n", "") for p in open('input', 'r').read().split("\n\n")]]))
