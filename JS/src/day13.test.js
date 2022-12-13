const { test } = require("@jest/globals");
const { part1, part2 } = require("./day13");
const Input = require("./input");
const EXAMPLE_INPUT = [
  "[1,1,3,1,1]",
  "[1,1,5,1,1]",
  "",
  "[[1],[2,3,4]]",
  "[[1],4]",
  "",
  "[9]",
  "[[8,7,6]]",
  "",
  "[[4,4],4,4]",
  "[[4,4],4,4,4]",
  "",
  "[7,7,7,7]",
  "[7,7,7]",
  "",
  "[]",
  "[3]",
  "",
  "[[[]]]",
  "[[]]",
  "",
  "[1,[2,[3,[4,[5,6,7]]]],8,9]",
  "[1,[2,[3,[4,[5,6,0]]]],8,9]",
];

test("Part 1 Example", () => {
  expect(part1(EXAMPLE_INPUT)).toBe(13);
});

test("Part 1", () => {
  const input = new Input(13).fromLines().get();
  expect(part1(input)).toBe(6568);
});

test("Part 2 Example", () => {
  expect(part2(EXAMPLE_INPUT)).toBe(140);
});

test("Part 2", () => {
  const input = new Input(13).fromLines().get();
  expect(part2(input)).toBe(19493);
});
