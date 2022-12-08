const { test } = require("@jest/globals");
const { part1, part2 } = require("./day08");
const Input = require("./input");
const EXAMPLE_INPUT = ["30373", "25512", "65332", "33549", "35390"];

test("Part 1 Example", () => {
  expect(part1(EXAMPLE_INPUT)).toBe(21);
});

test("Part 1", () => {
  const input = new Input(8).fromLines().get();
  expect(part1(input)).toBe(1782);
});

test("Part 2 Example", () => {
  expect(part2(EXAMPLE_INPUT)).toBe(8);
});

test("Part 2", () => {
  const input = new Input(8).fromLines().get();
  expect(part2(input)).toBeGreaterThan(69165);
});
