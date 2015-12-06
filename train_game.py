#!/usr/bin/python3

myList = [1,3,5,6]

def all_perms(elements):
    if len(elements) <=1:
        yield elements
    else:
        for perm in all_perms(elements[1:]):
            for i in range(len(elements)):
                # nb elements[0:1] works in both string and list contexts
                yield perm[:i] + elements[0:1] + perm[i:]
            
y = list(all_perms(myList))


for i in y:
    print(i)
