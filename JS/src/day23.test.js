const { test } = require("@jest/globals");
const { part1, part2 } = require("./day23");
const Input = require("./input");
const EXAMPLE_INPUT = [
  "....#..",
  "..###.#",
  "#...#.#",
  ".#...##",
  "#.###..",
  "##.#.##",
  ".#..#..",
];

test("Part 1 Example", () => {
  expect(part1(EXAMPLE_INPUT)).toBe(110);
});

test("Part 1", () => {
  const input = new Input(23).fromLines().get();
  expect(part1(input)).toBe(3996);
});

test("Part 2 Example", () => {
  expect(part2(EXAMPLE_INPUT)).toBe(20);
});

test("Part 2", () => {
  const input = new Input(23).fromLines().get();
  expect(part2(input)).toBe(908);
});

const jestConsole = console;

beforeEach(() => {
  global.console = require("console");
});

afterEach(() => {
  global.console = jestConsole;
});
