const { test } = require("@jest/globals");
const { part1, part1blueprint, part2 } = require("./day19");
const Input = require("./input");
const EXAMPLE_INPUT = [
  "Blueprint 1: Each ore robot costs 4 ore. Each clay robot costs 2 ore. Each obsidian robot costs 3 ore and 14 clay. Each geode robot costs 2 ore and 7 obsidian.",
  "Blueprint 2: Each ore robot costs 2 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 8 clay. Each geode robot costs 3 ore and 12 obsidian.",
];

test("Part 1 Example Blueprint a", () => {
  expect(part1blueprint(EXAMPLE_INPUT[0])).toBe(9);
});

test("Part 1 Example Blueprint b", () => {
  expect(part1blueprint(EXAMPLE_INPUT[1])).toBe(12);
});

test("Part 1 Example", () => {
  expect(part1(EXAMPLE_INPUT)).toBe(33);
});

test("Part 1", () => {
  const input = new Input(19).fromLines().get();
  expect(part1(input)).toBe(1413);
});

test("Part 2 Example", () => {
  expect(part2(EXAMPLE_INPUT)).toBe(3472);
});

test("Part 2", () => {
  const input = new Input(19).fromLines().get();
  expect(part2(input)).toBe(21080);
});

const jestConsole = console;

beforeEach(() => {
  global.console = require("console");
});

afterEach(() => {
  global.console = jestConsole;
});
