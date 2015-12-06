#!/usr/bin/python3

import sys, re, itertools

numbers_to_permute = []

operations = ['+','-','*','/']

for arg in sys.argv[1:]:
    numbers_to_permute.append(arg)

goal = 10

num = list(itertools.permutations(numbers_to_permute))
oper = list(itertools.combinations_with_replacement(operations,3))

def myZip(num, oper):
    expr = str(num[0]) + oper[0] + str(num[1]) + oper[1] + str(num[2]) + oper[2] + str(num[3])
    return round(eval(expr))
      
def solved(num, oper):
    expr = str(num[0]) + oper[0] + str(num[1]) + oper[1] + str(num[2]) + oper[2] + str(num[3])
    return expr
          
for o in oper:
    for n in num:
        result = myZip(n,o)
        if result == goal:
            print(solved(n,o), "=", goal)
        
    

