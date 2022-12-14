module.exports.part1 = (input) => {
  const [rocks, bottom] = parse(input);
  return maxSand(rocks, bottom, false);
};

module.exports.part2 = (input) => {
  const [rocks, bottom] = parse(input);
  return maxSand(rocks, bottom, true);
};

function parse(input) {
  const rocks = new Set();
  let bottom = 0;

  input.forEach((line) => {
    const points = line.split(" -> ").map((p) => p.split(",").map(Number));
    let [posX, posY] = points[0];

    rocks.add(posStr(posX, posY));

    points.forEach(([x, y]) => {
      while (posX !== x || posY !== y) {
        if (posX < x) posX++;
        if (posX > x) posX--;
        if (posY < y) posY++;
        if (posY > y) posY--;

        rocks.add(posStr(posX, posY));
        if (posY > bottom) bottom = posY;
      }
    });
  });

  return [rocks, bottom];
}

const posStr = (posX, posY) => `${posX},${posY}`;

function maxSand(rocks, bottom, hasFloor = false) {
  const sand = new Set();

  const getOptions = (posX, posY) => [
    [posX, posY + 1],
    [posX - 1, posY + 1],
    [posX + 1, posY + 1],
  ];

  const blocked = (posX, posY) => {
    const str = posStr(posX, posY);
    return rocks.has(str) || sand.has(str);
  };

  while (true) {
    let [posX, posY] = [500, 0];
    while (true) {
      const options = getOptions(posX, posY);

      if (!hasFloor && options.some(([x, y]) => y > bottom)) return sand.size;

      const next = options.find(([x, y]) => !blocked(x, y) && y < bottom + 2);

      if (next) {
        [posX, posY] = next;
      } else {
        if (posY === 0) return sand.size + 1;
        sand.add(posStr(posX, posY));
        break;
      }
    }
  }
}
