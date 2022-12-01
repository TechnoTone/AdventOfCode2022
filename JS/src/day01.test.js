const { test } = require("@jest/globals");
const { part1, part2 } = require("./day01");
const Input = require("./input");
const EXAMPLE_INPUT = [
  1000, 2000, 3000, 0, 4000, 0, 5000, 6000, 0, 7000, 8000, 9000, 0, 10000,
];

test("Part 1 Example", () => {
  expect(part1(EXAMPLE_INPUT)).toBe(24000);
});

test("Part 1", () => {
  const input = new Input(1).fromLines().asIntArray();
  expect(part1(input)).toBe(72478);
});

test("Part 2 Example", () => {
  expect(part2(EXAMPLE_INPUT)).toBe(45000);
});

test("Part 2", () => {
  const input = new Input(1).fromLines().asIntArray();
  expect(part2(input)).toBe(210367);
});
