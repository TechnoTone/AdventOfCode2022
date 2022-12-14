const { test } = require("@jest/globals");
const { part1, part2 } = require("./day14");
const Input = require("./input");
const EXAMPLE_INPUT = [
  "498,4 -> 498,6 -> 496,6",
  "503,4 -> 502,4 -> 502,9 -> 494,9",
];

test("Part 1 Example", () => {
  expect(part1(EXAMPLE_INPUT)).toBe(24);
});

test("Part 1", () => {
  const input = new Input(14).fromLines().get();
  expect(part1(input)).toBe(768);
});

test("Part 2 Example", () => {
  expect(part2(EXAMPLE_INPUT)).toBe(93);
});

test("Part 2", () => {
  const input = new Input(14).fromLines().get();
  expect(part2(input)).toBe(26686);
});
