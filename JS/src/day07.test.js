const { test } = require("@jest/globals");
const { part1, part2 } = require("./day07");
const Input = require("./input");
const EXAMPLE_INPUT = [
  "$ cd /",
  "$ ls",
  "dir a",
  "14848514 b.txt",
  "8504156 c.dat",
  "dir d",
  "$ cd a",
  "$ ls",
  "dir e",
  "29116 f",
  "2557 g",
  "62596 h.lst",
  "$ cd e",
  "$ ls",
  "584 i",
  "$ cd ..",
  "$ cd ..",
  "$ cd d",
  "$ ls",
  "4060174 j",
  "8033020 d.log",
  "5626152 d.ext",
  "7214296 k",
];

test("Part 1 Example", () => {
  expect(part1(EXAMPLE_INPUT)).toBe(95437);
});

test("Part 1", () => {
  const input = new Input(7).fromLines().get();
  expect(part1(input)).toBe(1743217);
});

test("Part 2 Example", () => {
  expect(part2(EXAMPLE_INPUT)).toBe(24933642);
});

test("Part 2", () => {
  const input = new Input(7).fromLines().get();
  expect(part2(input)).toBe(8319096);
});
