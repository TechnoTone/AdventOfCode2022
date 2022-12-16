const { test } = require("@jest/globals");
const { part1, part2 } = require("./day15");
const Input = require("./input");
const EXAMPLE_INPUT = [
  "Sensor at x=2, y=18: closest beacon is at x=-2, y=15",
  "Sensor at x=9, y=16: closest beacon is at x=10, y=16",
  "Sensor at x=13, y=2: closest beacon is at x=15, y=3",
  "Sensor at x=12, y=14: closest beacon is at x=10, y=16",
  "Sensor at x=10, y=20: closest beacon is at x=10, y=16",
  "Sensor at x=14, y=17: closest beacon is at x=10, y=16",
  "Sensor at x=8, y=7: closest beacon is at x=2, y=10",
  "Sensor at x=2, y=0: closest beacon is at x=2, y=10",
  "Sensor at x=0, y=11: closest beacon is at x=2, y=10",
  "Sensor at x=20, y=14: closest beacon is at x=25, y=17",
  "Sensor at x=17, y=20: closest beacon is at x=21, y=22",
  "Sensor at x=16, y=7: closest beacon is at x=15, y=3",
  "Sensor at x=14, y=3: closest beacon is at x=15, y=3",
  "Sensor at x=20, y=1: closest beacon is at x=15, y=3",
];

test("Part 1 Example", () => {
  expect(part1(EXAMPLE_INPUT, 10)).toBe(26);
});

test("Part 1", () => {
  const input = new Input(15).fromLines().get();
  expect(part1(input, 2000000)).toBe(5181556);
});

test("Part 2 Example", () => {
  expect(part2(EXAMPLE_INPUT, 20)).toBe(56000011);
});

test("Part 2", () => {
  const input = new Input(15).fromLines().get();
  expect(part2(input, 4000000)).toBe(12817603219131);
});
