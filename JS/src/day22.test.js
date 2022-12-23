const { test } = require("@jest/globals");
const { part1, part2 } = require("./day22");
const Input = require("./input");
const EXAMPLE_INPUT = [
  "        ...#",
  "        .#..",
  "        #...",
  "        ....",
  "...#.......#",
  "........#...",
  "..#....#....",
  "..........#.",
  "        ...#....",
  "        .....#..",
  "        .#......",
  "        ......#.",
  "",
  "10R5L5R10L4R5L5",
];

test("Part 1 Example", () => {
  expect(part1(EXAMPLE_INPUT)).toBe(6032);
});

test("Part 1", () => {
  const input = new Input(22).fromLines().get();
  expect(part1(input)).toBe(162186);
});

test("Part 2 Example", () => {
  expect(part2(EXAMPLE_INPUT)).toBe(5031);
});

test("Part 2", () => {
  const input = new Input(22).fromLines().get();
  expect(part2(input)).toBe(55267);
});

const jestConsole = console;

beforeEach(() => {
  global.console = require("console");
});

afterEach(() => {
  global.console = jestConsole;
});
