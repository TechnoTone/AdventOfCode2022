module.exports.part1 = (input) => visibleTreesFromOutside(input);

module.exports.part2 = (input) => highestScenicScore(input);

const DIRECTION = {
  UP: 0,
  DOWN: 1,
  LEFT: 2,
  RIGHT: 3,
};

function visibleTreesFromOutside(trees) {
  const width = trees[0].length;
  const height = trees.length;
  const visible = Array(width)
    .fill()
    .map(() => Array(height).fill(false));

  const tree = (x, y) => Number(trees[y][x]);
  const look = (x, y, direction, h = -1) => {
    if (x < 0 || x >= width || y < 0 || y >= height || height === 9) return;
    const t = tree(x, y);
    if (t > h) {
      visible[y][x] = true;
      h = t;
    }
    switch (direction) {
      case DIRECTION.UP:
        look(x, y - 1, direction, h);
        break;
      case DIRECTION.DOWN:
        look(x, y + 1, direction, h);
        break;
      case DIRECTION.LEFT:
        look(x - 1, y, direction, h);
        break;
      case DIRECTION.RIGHT:
        look(x + 1, y, direction, h);
        break;
    }
  };

  for (let x = 1; x < width - 1; x++) {
    look(x, 0, DIRECTION.DOWN);
    look(x, height - 1, DIRECTION.UP);
  }
  for (let y = 1; y < height - 1; y++) {
    look(0, y, DIRECTION.RIGHT);
    look(width - 1, y, DIRECTION.LEFT);
  }

  return visible.reduce((acc, row) => acc + row.reduce((a, b) => a + b, 0), 4);
}

function highestScenicScore(trees) {
  const width = trees[0].length;
  const height = trees.length;

  const tree = (x, y) => Number(trees[y][x]);
  const look = (x, y, direction, h) => {
    if (x < 0 || x >= width || y < 0 || y >= height) return 0;
    const t = tree(x, y);
    if (t >= h) return 1;
    switch (direction) {
      case DIRECTION.UP:
        return 1 + look(x, y - 1, direction, h);
      case DIRECTION.DOWN:
        return 1 + look(x, y + 1, direction, h);
      case DIRECTION.LEFT:
        return 1 + look(x - 1, y, direction, h);
      case DIRECTION.RIGHT:
        return 1 + look(x + 1, y, direction, h);
    }
  };

  let highestScore = 0;

  for (let x = 1; x < width - 1; x++) {
    for (let y = 1; y < height - 1; y++) {
      const h = tree(x, y);

      const score =
        look(x, y - 1, DIRECTION.UP, h) *
        look(x, y + 1, DIRECTION.DOWN, h) *
        look(x - 1, y, DIRECTION.LEFT, h) *
        look(x + 1, y, DIRECTION.RIGHT, h);

      if (score > highestScore) highestScore = score;
    }
  }

  return highestScore;
}
