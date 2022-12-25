const { test } = require("@jest/globals");
const { part1, part2 } = require("./day24");
const Input = require("./input");
const EXAMPLE_INPUT = [
  "#.######",
  "#>>.<^<#",
  "#.<..<<#",
  "#>v.><>#",
  "#<^v^^>#",
  "######.#",
];

test("Part 1 Example", () => {
  expect(part1(EXAMPLE_INPUT)).toBe(18);
});

test("Part 1", () => {
  const input = new Input(24).fromLines().get();
  expect(part1(input)).toBe(314);
});

test("Part 2 Example", () => {
  expect(part2(EXAMPLE_INPUT)).toBe(54);
});

test("Part 2", () => {
  const input = new Input(24).fromLines().get();
  expect(part2(input)).toBe(896);
});

const jestConsole = console;

beforeEach(() => {
  global.console = require("console");
});

afterEach(() => {
  global.console = jestConsole;
});
