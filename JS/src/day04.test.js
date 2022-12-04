const { test } = require("@jest/globals");
const { part1, part2 } = require("./day04");
const Input = require("./input");
const EXAMPLE_INPUT = [
  "2-4,6-8",
  "2-3,4-5",
  "5-7,7-9",
  "2-8,3-7",
  "6-6,4-6",
  "2-6,4-8",
];

test("Part 1 Example", () => {
  expect(part1(EXAMPLE_INPUT)).toBe(2);
});

test("Part 1", () => {
  const input = new Input(4).fromLines().get();
  expect(part1(input)).toBe(433);
});

test("Part 2 Example", () => {
  expect(part2(EXAMPLE_INPUT)).toBe(4);
});

test("Part 2", () => {
  const input = new Input(4).fromLines().get();
  expect(part2(input)).toBe(852);
});
