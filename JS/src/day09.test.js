const { test } = require("@jest/globals");
const { part1, part2 } = require("./day09");
const Input = require("./input");
const EXAMPLE_INPUT = ["R 4", "U 4", "L 3", "D 1", "R 4", "D 1", "L 5", "R 2"];

test("Part 1 Example", () => {
  expect(part1(EXAMPLE_INPUT)).toBe(13);
});

test("Part 1", () => {
  const input = new Input(9).fromLines().get();
  expect(part1(input)).toBe(6190);
});

test("Part 2 Example", () => {
  expect(part2(EXAMPLE_INPUT)).toBe(1);
});

test("Part 2", () => {
  const input = new Input(9).fromLines().get();
  expect(part2(input)).toBe(2516);
});
