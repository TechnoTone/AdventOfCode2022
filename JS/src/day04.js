module.exports.part1 = (input) =>
  input
    .map((line) => getRanges(line))
    .filter(([r1, r2]) => contains(r1, r2) || contains(r2, r1)).length;

module.exports.part2 = (input) =>
  input
    .map((line) => getRanges(line))
    .filter(([r1, r2]) => overlaps(r1, r2) || overlaps(r2, r1)).length;

const getRanges = (line) =>
  line.split(",").map((range) => range.split("-").map(Number));

const contains = ([min1, max1], [min2, max2]) => min1 <= min2 && max1 >= max2;
const overlaps = ([min1, max1], [min2, max2]) => min1 <= max2 && max1 >= min2;
