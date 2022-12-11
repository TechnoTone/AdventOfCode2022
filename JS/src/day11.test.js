const { test } = require("@jest/globals");
const { part1, part2 } = require("./day11");
const Input = require("./input");
const EXAMPLE_INPUT = `Monkey 0:
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
    If false: throw to monkey 1`;

test("Part 1 Example", () => {
  expect(part1(EXAMPLE_INPUT)).toBe(10605);
});

test("Part 1", () => {
  const input = new Input(11).get();
  expect(part1(input)).toBe(113232);
});

test("Part 2 Example", () => {
  expect(part2(EXAMPLE_INPUT)).toBe(2713310158);
});

test("Part 2", () => {
  const input = new Input(11).get();
  expect(part2(input)).toBe(29703395016);
});
