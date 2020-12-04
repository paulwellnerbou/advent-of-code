
print(len([p for p in [p.replace("\n", " ") for p in open('input', 'r').read().split("\n\n")] if p.count(" ") == 7 or (p.count(" ") == 6 and "cid:" not in p)]))
