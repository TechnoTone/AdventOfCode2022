const { test } = require("@jest/globals");
const { part1, part2 } = require("./day20");
const Input = require("./input");
const EXAMPLE_INPUT = [1, 2, -3, 3, -2, 0, 4];

test("Part 1 Example", () => {
  expect(part1(EXAMPLE_INPUT)).toBe(3);
});

test("Part 1", () => {
  const input = new Input(20).fromLines().asIntArray();
  expect(part1(input)).toBe(13967);
});

test("Part 2 Example", () => {
  expect(part2(EXAMPLE_INPUT)).toBe(1623178306);
});

test("Part 2", () => {
  const input = new Input(20).fromLines().asIntArray();
  expect(part2(input)).toBe(1790365671518);
});

const jestConsole = console;

beforeEach(() => {
  global.console = require("console");
});

afterEach(() => {
  global.console = jestConsole;
});
