#!/usr/bin/python3

import itertools

myList = [1,3,5,6]

# Explanation of yield keyword:
# an iterator is used to describe an object that has a next() method.
# a yield allows a function to be iterated.

def all_perms(elements):
    if len(elements) <=1:
        yield elements
    else:
        for perm in all_perms(elements[1:]):
            for i in range(len(elements)):
                # nb elements[0:1] works in both string and list contexts
                yield perm[:i] + elements[0:1] + perm[i:]
            
num = list(all_perms(myList))

oper = list(itertools.combinations_with_replacement(['+','-','*','/'],3))

for i in oper:
    print(i)
    
for i in num:
    print(i)
