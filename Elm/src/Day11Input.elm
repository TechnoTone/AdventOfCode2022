module Day11Input exposing (..)


example : String
example =
    String.trim """
Monkey 0:
  Starting items: 79, 98
  Operation: new = old * 19
  Test: divisible by 23
    If true: throw to monkey 2
    If false: throw to monkey 3

Monkey 1:
  Starting items: 54, 65, 75, 74
  Operation: new = old + 6
  Test: divisible by 19
    If true: throw to monkey 2
    If false: throw to monkey 0

Monkey 2:
  Starting items: 79, 60, 97
  Operation: new = old * old
  Test: divisible by 13
    If true: throw to monkey 1
    If false: throw to monkey 3

Monkey 3:
  Starting items: 74
  Operation: new = old + 3
  Test: divisible by 17
    If true: throw to monkey 0
    If false: throw to monkey 1
"""


input : String
input =
    String.trim """
Monkey 0:
Starting items: 64, 89, 65, 95
Operation: new = old * 7
Test: divisible by 3
If true: throw to monkey 4
If false: throw to monkey 1

Monkey 1:
Starting items: 76, 66, 74, 87, 70, 56, 51, 66
Operation: new = old + 5
Test: divisible by 13
If true: throw to monkey 7
If false: throw to monkey 3

Monkey 2:
Starting items: 91, 60, 63
Operation: new = old * old
Test: divisible by 2
If true: throw to monkey 6
If false: throw to monkey 5

Monkey 3:
Starting items: 92, 61, 79, 97, 79
Operation: new = old + 6
Test: divisible by 11
If true: throw to monkey 2
If false: throw to monkey 6

Monkey 4:
Starting items: 93, 54
Operation: new = old * 11
Test: divisible by 5
If true: throw to monkey 1
If false: throw to monkey 7

Monkey 5:
Starting items: 60, 79, 92, 69, 88, 82, 70
Operation: new = old + 8
Test: divisible by 17
If true: throw to monkey 4
If false: throw to monkey 0

Monkey 6:
Starting items: 64, 57, 73, 89, 55, 53
Operation: new = old + 1
Test: divisible by 19
If true: throw to monkey 0
If false: throw to monkey 5

Monkey 7:
Starting items: 62
Operation: new = old + 4
Test: divisible by 7
If true: throw to monkey 3
If false: throw to monkey 2
"""
