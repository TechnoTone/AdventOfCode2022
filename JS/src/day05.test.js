const { test } = require("@jest/globals");
const { part1, part2 } = require("./day05");
const Input = require("./input");
const EXAMPLE_INPUT = [
  "    [D]    ",
  "[N] [C]    ",
  "[Z] [M] [P]",
  " 1   2   3 ",
  "",
  "move 1 from 2 to 1",
  "move 3 from 1 to 3",
  "move 2 from 2 to 1",
  "move 1 from 1 to 2",
];

test("Part 1 Example", () => {
  expect(part1(EXAMPLE_INPUT)).toBe("CMZ");
});

test("Part 1", () => {
  const input = new Input(5).fromLines().get();
  expect(part1(input)).toBe("QNNTGTPFN");
});

test("Part 2 Example", () => {
  expect(part2(EXAMPLE_INPUT)).toBe("MCD");
});

test("Part 2", () => {
  const input = new Input(5).fromLines().get();
  expect(part2(input)).toBe("GGNPJBTTR");
});
