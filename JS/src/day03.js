module.exports.part1 = (input) => {
  return input
    .map((line) => getPriority(getDuplicate(line)))
    .reduce((a, b) => a + b);
};

module.exports.part2 = (input) => {
  const groups = input.reduce(
    ([acc, next], curr) => {
      next.push(curr);
      if (next.length === 3) {
        acc.push(next);
        return [acc, []];
      }
      return [acc, next];
    },
    [[], []]
  )[0];

  return groups
    .map((group) => getPriority(getBadge(group)))
    .reduce((a, b) => a + b);
};

function getDuplicate(line) {
  const left = new Set();
  const right = new Set();

  for (let i = 0; i < line.length / 2; i++) {
    if (right.has(line[i])) return line[i];
    left.add(line[i]);
    if (left.has(line[line.length - 1 - i])) return line[line.length - 1 - i];
    right.add(line[line.length - 1 - i]);
  }
}

function getPriority(item) {
  const priority = item.charCodeAt(0) - 38;
  return priority > 52 ? priority - 58 : priority;
}

function getBadge(group) {
  const groupBadges = group.map((g) => new Set(g.split("")));
  const badges = [...groupBadges[0]];
  return badges.find((b) => groupBadges.every((g) => g.has(b)));
}
