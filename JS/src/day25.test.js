const { test } = require("@jest/globals");
const { part1, part2 } = require("./day25");
const Input = require("./input");
const EXAMPLE_INPUT = [
  "1=-0-2",
  "12111",
  "2=0=",
  "21",
  "2=01",
  "111",
  "20012",
  "112",
  "1=-1=",
  "1-12",
  "12",
  "1=",
  "122",
];

test("Part 1 Example", () => {
  expect(part1(EXAMPLE_INPUT)).toBe("2=-1=0");
});

test("Part 1", () => {
  const input = new Input(25).fromLines().get();
  expect(part1(input)).toBe("2-2=21=0021=-02-1=-0");
});

const jestConsole = console;

beforeEach(() => {
  global.console = require("console");
});

afterEach(() => {
  global.console = jestConsole;
});
