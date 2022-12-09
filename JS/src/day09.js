module.exports.part1 = (input) => processMoves(parse(input), 2);
module.exports.part2 = (input) => processMoves(parse(input), 10);

function parse(input) {
  return input.map((line) => {
    const [direction, distance] = line.split(" ");
    return { direction, distance: parseInt(distance) };
  });
}

function processMoves(moves, knotCount) {
  const knots = new Array(knotCount).fill().map(() => [0, 0]);
  const visited = new Set();

  const visit = (pos) => visited.add(pos.join());
  visit(knots[knotCount - 1]);

  function moveKnot(ix, pos) {
    knots[ix] = pos;

    if (ix === knotCount - 1) {
      visit(knots[ix]);
      return;
    }

    const [nX, nY] = knots[ix + 1];
    const diffs = [pos[0] - nX, pos[1] - nY];
    if (Math.abs(diffs[0]) > 1 || Math.abs(diffs[1]) > 1) {
      moveKnot(ix + 1, [nX + Math.sign(diffs[0]), nY + Math.sign(diffs[1])]);
    }
  }

  moves.forEach(({ direction, distance }) => {
    let [x, y] = knots[0];
    switch (direction) {
      case "R":
        while (distance--) moveKnot(0, [++x, y]);
        break;
      case "L":
        while (distance--) moveKnot(0, [--x, y]);
        break;
      case "U":
        while (distance--) moveKnot(0, [x, ++y]);
        break;
      case "D":
        while (distance--) moveKnot(0, [x, --y]);
        break;
    }
  });

  return visited.size;
}
