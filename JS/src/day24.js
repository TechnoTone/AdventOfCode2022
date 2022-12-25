const UP = "^";
const DOWN = "v";
const LEFT = "<";
const RIGHT = ">";

module.exports.part1 = (input) => fewestStepsToReach(parseMap(input));

module.exports.part2 = (input) =>
  fewestStepsToReachEndThenStartThenEnd(parseMap(input));

function parseMap(input) {
  const width = input[0].length - 2;
  const height = input.length - 2;
  const start = xy(0, -1);
  const end = xy(width - 1, height - 1);

  const blizzards = {
    up: Array(width)
      .fill()
      .map(() => new Set()),
    down: Array(width)
      .fill()
      .map(() => new Set()),
    left: Array(height)
      .fill()
      .map(() => new Set()),
    right: Array(height)
      .fill()
      .map(() => new Set()),
  };

  for (let y = 1; y <= height; y++) {
    for (let x = 1; x <= width; x++) {
      const tile = input[y][x];
      switch (tile) {
        case UP:
          blizzards.up[x - 1].add(y - 1);
          break;
        case DOWN:
          blizzards.down[x - 1].add(y - 1);
          break;
        case LEFT:
          blizzards.left[y - 1].add(x - 1);
          break;
        case RIGHT:
          blizzards.right[y - 1].add(x - 1);
          break;
      }
    }
  }

  return { blizzards, width, height, start, end };
}

function xy(x, y) {
  return `${x},${y}`;
}

function yx(xy) {
  return xy.split(",").map(Number);
}

function adjust(pos, offset, max) {
  const adjusted = (pos + offset) % max;
  return adjusted < 0 ? adjusted + max : adjusted;
}

function fewestStepsToReach({
  blizzards,
  width,
  height,
  start,
  end,
  steps = 0,
}) {
  let queue = [start];

  while (++steps) {
    const next = new Set();
    for (const pos of queue) {
      const [oldX, oldY] = yx(pos);
      [
        [oldX + 1, oldY],
        [oldX - 1, oldY],
        [oldX, oldY + 1],
        [oldX, oldY - 1],
        [oldX, oldY],
      ].forEach(([x, y]) => {
        if (xy(x, y) === start) {
          next.add(start);
          return;
        }
        if (x < 0 || y < 0 || x >= width || y >= height) return;

        if (
          !blizzards.right[y].has(adjust(x, -steps, width)) &&
          !blizzards.left[y].has(adjust(x, +steps, width)) &&
          !blizzards.down[x].has(adjust(y, -steps, height)) &&
          !blizzards.up[x].has(adjust(y, +steps, height))
        )
          next.add(xy(x, y));
      });
    }
    if (next.has(end)) return steps + 1;
    if (next.size === 0) return 0;
    queue = [...next];
  }
}

function fewestStepsToReachEndThenStartThenEnd(props) {
  const start = xy(yx(props.end)[0], yx(props.end)[1] + 1);
  const end = xy(yx(props.start)[0], yx(props.start)[1] + 1);

  let steps = fewestStepsToReach(props);
  steps = fewestStepsToReach({ ...props, start, end, steps });
  steps = fewestStepsToReach({ ...props, steps });

  return steps;
}
