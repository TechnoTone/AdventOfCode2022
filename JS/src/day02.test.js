const { test } = require("@jest/globals");
const { part1, part2 } = require("./day02");
const Input = require("./input");
const EXAMPLE_INPUT = ["A Y", "B X", "C Z"];

test("Part 1 Example", () => {
  expect(part1(EXAMPLE_INPUT)).toBe(15);
});

test("Part 1", () => {
  const input = new Input(2).fromLines().get();
  expect(part1(input)).toBe(10718);
});

test("Part 2 Example", () => {
  expect(part2(EXAMPLE_INPUT)).toBe(12);
});

test("Part 2", () => {
  const input = new Input(2).fromLines().get();
  expect(part2(input)).toBe(14652);
});
