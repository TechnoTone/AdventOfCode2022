const { test } = require("@jest/globals");
const { part1, part2 } = require("./day12");
const Input = require("./input");
const EXAMPLE_INPUT = [
  "Sabqponm",
  "abcryxxl",
  "accszExk",
  "acctuvwj",
  "abdefghi",
];

test("Part 1 Example", () => {
  expect(part1(EXAMPLE_INPUT)).toBe(31);
});

test("Part 1", () => {
  const input = new Input(12).fromLines().get();
  expect(part1(input)).toBe(504);
});

test("Part 2 Example", () => {
  expect(part2(EXAMPLE_INPUT)).toBe(29);
});

test("Part 2", () => {
  const input = new Input(12).fromLines().get();
  expect(part2(input)).toBe(500);
});
