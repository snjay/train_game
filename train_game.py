#!/usr/bin/python3

import sys, itertools

numbers_to_permute = []
operations = ['+','-','*','/']

# Generates expressions to be evaluated
# PERFORMANCE-wise it is good. 
# However need to make this more abstract in case more operations are added.
# TODO: make this operation less dependant on individual array indices.
def myZip(num, oper):
    expr = str(num[0]) + oper[0] + str(num[1]) + oper[1] + str(num[2]) + oper[2] + str(num[3])
    return round(eval(expr))

# Returns str expression of a correctly evaluated expression.
# e.g. (with a goal of 10): '1+2+3+4'
# TODO: integrate this with myZip function and return (answer, str_expression) tuple
def solved(num, oper):
    expr = str(num[0]) + oper[0] + str(num[1]) + oper[1] + str(num[2]) + oper[2] + str(num[3])
    return expr

# Check number of arguments provided
if (len(sys.argv) != 6):
    print ("Usage:", sys.argv[0], "[number] [number] [number] [number] [goal]")
    sys.exit(1)

# Four input numbers
numbers_to_permute.append(int(sys.argv[1]))
numbers_to_permute.append(int(sys.argv[2]))
numbers_to_permute.append(int(sys.argv[3]))
numbers_to_permute.append(int(sys.argv[4]))

# Goal number - the number to be obtained
goal = int(sys.argv[5])

# Return permutation of every number
num = list(itertools.permutations(numbers_to_permute))
# Return a combination (with replacement) of every operator
oper = list(itertools.combinations_with_replacement(operations,len(operations)-1))



# # PERFORMANCE-wise: not that great, must shy away brute-force approach.
for o in oper:
    for n in num:
        result = myZip(n,o)
        if result == goal:
            print(solved(n,o), "=", goal)