module.exports.part1 = (input) => {
  const elves = parseElves(input);

  for (let i = 0; i < 10; i++) moveElves(elves, i);

  const coords = [...elves].map((e) => e.split(",").map(Number));
  const xMin = Math.min(...coords.map((c) => c[0]));
  const xMax = Math.max(...coords.map((c) => c[0]));
  const yMin = Math.min(...coords.map((c) => c[1]));
  const yMax = Math.max(...coords.map((c) => c[1]));
  const [width, height] = [xMax - xMin + 1, yMax - yMin + 1];

  return width * height - elves.size;
};

module.exports.part2 = (input) => {
  const elves = parseElves(input);

  let i = 0;
  let moved = true;
  while (moved) {
    moved = moveElves(elves, i);
    i++;
  }

  return i;
};

function parseElves(input) {
  const elves = new Set();
  input.forEach((line, y) => {
    line.split("").forEach((c, x) => {
      if (c === "#") {
        elves.add(xy(x + 100, y + 100));
      }
    });
  });
  return elves;
}

function xy(x, y) {
  return `${x},${y}`;
}

function moveElves(elves, directionOffset) {
  const empty = (x, y) => !elves.has(xy(x, y));

  const moves = [...elves].map((elf) => {
    const [x, y] = elf.split(",").map(Number);
    if (
      empty(x - 1, y - 1) &&
      empty(x, y - 1) &&
      empty(x + 1, y - 1) &&
      empty(x - 1, y) &&
      empty(x + 1, y) &&
      empty(x - 1, y + 1) &&
      empty(x, y + 1) &&
      empty(x + 1, y + 1)
    )
      return { from: elf };

    for (let direction = 0; direction < 4; direction++) {
      switch ((direction + directionOffset) % 4) {
        case 0:
          if (empty(x - 1, y - 1) && empty(x, y - 1) && empty(x + 1, y - 1))
            return { from: elf, to: xy(x, y - 1) };
          break;
        case 1:
          if (empty(x - 1, y + 1) && empty(x, y + 1) && empty(x + 1, y + 1))
            return { from: elf, to: xy(x, y + 1) };
          break;
        case 2:
          if (empty(x - 1, y - 1) && empty(x - 1, y) && empty(x - 1, y + 1))
            return { from: elf, to: xy(x - 1, y) };
          break;
        case 3:
          if (empty(x + 1, y - 1) && empty(x + 1, y) && empty(x + 1, y + 1))
            return { from: elf, to: xy(x + 1, y) };
          break;
      }
    }
    return { from: elf };
  });

  const targets = new Map();
  moves.forEach(({ to }) => {
    if (targets.has(to)) targets.set(to, targets.get(to) + 1);
    else targets.set(to, 1);
  });

  const validMoves = moves.filter(({ to }) => targets.get(to) === 1);

  validMoves.forEach(({ from, to }) => {
    if (to) {
      elves.delete(from);
      elves.add(to);
    }
  });

  return validMoves.length;
}
