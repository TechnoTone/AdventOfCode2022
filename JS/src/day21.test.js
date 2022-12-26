const { test } = require("@jest/globals");
const { part1, part2 } = require("./day21");
const Input = require("./input");
const EXAMPLE_INPUT = [
  "root: pppw + sjmn",
  "dbpl: 5",
  "cczh: sllz + lgvd",
  "zczc: 2",
  "ptdq: humn - dvpt",
  "dvpt: 3",
  "lfqf: 4",
  "humn: 5",
  "ljgn: 2",
  "sjmn: drzm * dbpl",
  "sllz: 4",
  "pppw: cczh / lfqf",
  "lgvd: ljgn * ptdq",
  "drzm: hmdt - zczc",
  "hmdt: 32",
];

test("Part 1 Example", () => {
  expect(part1(EXAMPLE_INPUT)).toBe(152);
});

test("Part 1", () => {
  const input = new Input(21).fromLines().get();
  expect(part1(input)).toBe(170237589447588);
});

test("Part 2 Example", () => {
  expect(part2(EXAMPLE_INPUT)).toBe(301);
});

test("Part 2", () => {
  const input = new Input(21).fromLines().get();
  expect(part2(input)).toBe(3712643961892);
});

const jestConsole = console;

beforeEach(() => {
  global.console = require("console");
});

afterEach(() => {
  global.console = jestConsole;
});
