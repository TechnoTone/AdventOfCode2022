const { test } = require("@jest/globals");
const { part1, part2 } = require("./day06");
const Input = require("./input");
const EXAMPLES = [
  { input: "mjqjpqmgbljsphdztnvjfqwrcgsmlb", result1: 7, result2: 19 },
  { input: "bvwbjplbgvbhsrlpgdmjqwftvncz", result1: 5, result2: 23 },
  { input: "nppdvjthqldpwncqszvftbrmjlhg", result1: 6, result2: 23 },
  { input: "nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg", result1: 10, result2: 29 },
  { input: "zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw", result1: 11, result2: 26 },
];

test.each(EXAMPLES.map((x) => [x.input, x.result1]))(
  "Part 1 Example, %s should return %i",
  (input, result) => expect(part1(input)).toBe(result)
);

test("Part 1", () => {
  const input = new Input(6).get();
  expect(part1(input)).toBe(1578);
});

test.each(EXAMPLES.map((x) => [x.input, x.result2]))(
  "Part 2 Example, %s should return %i",
  (input, result) => expect(part2(input)).toBe(result)
);

test("Part 2", () => {
  const input = new Input(6).get();
  expect(part2(input)).toBe(2178);
});
