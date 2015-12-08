#!/usr/bin/python3

import itertools

numbers_to_permute = []
operations = ['+','-','*','/']

def myZip(num, oper):
    expr = str(num[0]) + oper[0] + str(num[1]) + oper[1] + str(num[2]) + oper[2] + str(num[3])
    return round(eval(expr))
      
def solved(num, oper):
    expr = str(num[0]) + oper[0] + str(num[1]) + oper[1] + str(num[2]) + oper[2] + str(num[3])
    return expr

print("Please enter 4 numbers: ")
numbers_to_permute.append(int(input("number 1: ")))
numbers_to_permute.append(int(input("number 2: ")))
numbers_to_permute.append(int(input("number 3: ")))
numbers_to_permute.append(int(input("number 4: ")))

print("Enter a goal number: ")
goal = int(input("goal: "))

# return permutation of every number
num = list(itertools.permutations(numbers_to_permute))
# return a combination (with replacement) of every operator
oper = list(itertools.combinations_with_replacement(operations,len(operations)-1))

# main calculations
for o in oper:
    for n in num:
        result = myZip(n,o)
        if result == goal:
            print(solved(n,o), "=", goal)
