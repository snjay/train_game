#!/usr/bin/python3

import sys, re, itertools

numbers_to_permute = []

operations = ['+','-','*','/']

for arg in sys.argv[1:]:
    numbers_to_permute.append(arg)

goal = 10

num = list(itertools.permutations(numbers_to_permute))
oper = list(itertools.combinations_with_replacement(operations,3))

