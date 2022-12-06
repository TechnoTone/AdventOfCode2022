module.exports.part1 = (input) => findStart(input.split(""), 4);
module.exports.part2 = (input) => findStart(input.split(""), 14);

findStart = (chars, size) => {
  let i = 0;
  while (true) {
    if (new Set(chars.slice(i, i + size)).size === size) return i + size;
    i++;
  }
};
