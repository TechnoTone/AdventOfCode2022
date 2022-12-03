const { test } = require("@jest/globals");
const { part1, part2 } = require("./day03");
const Input = require("./input");
const EXAMPLE_INPUT = [
  "vJrwpWtwJgWrhcsFMMfFFhFp",
  "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL",
  "PmmdzqPrVvPwwTWBwg",
  "wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn",
  "ttgJtRGJQctTZtZT",
  "CrZsJsPPZsGzwwsLwLmpwMDw",
];

test("Part 1 Example", () => {
  expect(part1(EXAMPLE_INPUT)).toBe(157);
});

test("Part 1", () => {
  const input = new Input(3).fromLines().get();
  expect(part1(input)).toBe(7908);
});

test("Part 2 Example", () => {
  expect(part2(EXAMPLE_INPUT)).toBe(70);
});

test("Part 2", () => {
  const input = new Input(3).fromLines().get();
  expect(part2(input)).toBe(2838);
});
