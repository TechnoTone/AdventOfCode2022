const { test } = require("@jest/globals");
const { part1, part2 } = require("./day18");
const Input = require("./input");
const EXAMPLE_INPUT = [
  "2,2,2",
  "1,2,2",
  "3,2,2",
  "2,1,2",
  "2,3,2",
  "2,2,1",
  "2,2,3",
  "2,2,4",
  "2,2,6",
  "1,2,5",
  "3,2,5",
  "2,1,5",
  "2,3,5",
];

test("Part 1 Example", () => {
  expect(part1(EXAMPLE_INPUT)).toBe(64);
});

test("Part 1", () => {
  const input = new Input(18).fromLines().get();
  expect(part1(input)).toBe(3526);
});

test("Part 2 Example", () => {
  expect(part2(EXAMPLE_INPUT)).toBe(58);
});

test("Part 2", () => {
  const input = new Input(18).fromLines().get();
  expect(part2(input)).toBe(2090);
});
