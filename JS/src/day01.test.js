const { test } = require("@jest/globals");
const { part1, part2 } = require("./day01");
const Input = require("./input");

test("Part 1 Example", () => {
  const input = [];
  expect(part1(input)).toBe(0);
});

test("Part 1", () => {
  const input = new Input(1).fromLines().asIntArray();
  expect(part1(input)).toBe(0);
});

test("Part 2 Example", () => {
  const input = [];
  expect(part2(input)).toBe(0);
});

test("Part 2", () => {
  const input = new Input(1).fromLines().asIntArray();
  expect(part2(input)).toBe(0);
});
