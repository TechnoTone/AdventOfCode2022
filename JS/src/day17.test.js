const { test } = require("@jest/globals");
const { part1, part2 } = require("./day17");
const Input = require("./input");
const EXAMPLE_INPUT = ">>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>";

test("Part 1 Example", () => {
  expect(part1(EXAMPLE_INPUT)).toBe(3068);
});

test("Part 1", () => {
  const input = new Input(17).get();
  expect(part1(input)).toBe(3166);
});

test("Part 2 Example", () => {
  expect(part2(EXAMPLE_INPUT)).toBe(1514285714288);
});

test("Part 2", () => {
  const input = new Input(17).get();
  expect(part2(input)).toBe(1577207977186);
});

const jestConsole = console;

beforeEach(() => {
  global.console = require("console");
});

afterEach(() => {
  global.console = jestConsole;
});
