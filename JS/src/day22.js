const RIGHT = 0;
const DOWN = 1;
const LEFT = 2;
const UP = 3;

module.exports.part1 = (input) => {
  const { map, instructions, colRange, rowRange } = parseInput(input);
  return traverse(map, instructions, step1(map, colRange, rowRange));
};

module.exports.part2 = (input) => {
  const { map, instructions, colRange, rowRange } = parseInput(input);
  return traverse(map, instructions, step2(map, colRange, rowRange));
};

function parseInput(input) {
  const map = input.slice(0, -2);
  const instructions = input[input.length - 1].match(/\d+|(L|R)/g);

  const height = map.length;
  const width = Math.max(...map.map((line) => line.length));

  const colRange = [];
  const rowRange = [];

  for (let y = 0; y < height; y++) {
    let [min, max] = [width, 0];
    for (let x = 0; x < width; x++) {
      if (map[y][x]?.trim()) {
        if (x < min) min = x;
        if (x > max) max = x;
      }
    }
    rowRange.push({ min, max });
  }

  for (let x = 0; x < width; x++) {
    let [min, max] = [height, 0];
    for (let y = 0; y < height; y++) {
      if (map[y][x]?.trim()) {
        if (y < min) min = y;
        if (y > max) max = y;
      }
    }
    colRange.push({ min, max });
  }

  return { map, instructions, colRange, rowRange };
}

function traverse(map, instructions, stepFn) {
  let [x, y, direction] = [map[0].indexOf("."), 0, 0];

  for (let i = 0; i < instructions.length; i++) {
    switch (instructions[i]) {
      case "L":
        direction = (direction + 3) % 4;
        break;
      case "R":
        direction = (direction + 1) % 4;
        break;
      default:
        let steps = parseInt(instructions[i]);
        while (steps--) {
          const [newX, newY, newDirection] = stepFn(x, y, direction);
          if (newX === x && newY === y) steps = 0; //blocked
          [x, y, direction] = [newX, newY, newDirection];
        }
    }
  }

  return (y + 1) * 1000 + (x + 1) * 4 + direction;
}

function step1(map, colRange, rowRange) {
  return function (x, y, direction) {
    let [newX, newY] = [x, y];
    do {
      switch (direction) {
        case RIGHT:
          newX++;
          break;
        case DOWN:
          newY++;
          break;
        case LEFT:
          newX--;
          break;
        case UP:
          newY--;
          break;
      }

      if (newX < rowRange[y].min) newX = rowRange[y].max;
      if (newX > rowRange[y].max) newX = rowRange[y].min;
      if (newY < colRange[x].min) newY = colRange[x].max;
      if (newY > colRange[x].max) newY = colRange[x].min;
      if (map[newY][newX] === "#") return [x, y, direction];
    } while (!map[newY][newX]);
    return [newX, newY, direction];
  };
}

function step2(map, colRange, rowRange) {
  const [width, height] = [colRange.length, rowRange.length];
  const faceSize = Math.max(width, height) / 4;

  const faceNumber =
    faceSize === 4
      ? (x, y) => {
          if (y < faceSize) return 0;
          if (x < faceSize) return 1;
          if (x < faceSize * 2) return 2;
          if (y < faceSize * 2) return 3;
          if (x < faceSize * 3) return 4;
          return 5;
        }
      : (x, y) => {
          if (y >= faceSize * 3) return 5;
          if (x < faceSize) return 3;
          if (y >= faceSize * 2) return 4;
          if (y >= faceSize) return 2;
          if (x >= faceSize * 2) return 1;
          return 0;
        };

  return function (x, y, direction) {
    const [newX, newY, newDirection] = (() => {
      let [newX, newY] = [x, y];
      do {
        switch (direction) {
          case RIGHT:
            newX++;
            break;
          case DOWN:
            newY++;
            break;
          case LEFT:
            newX--;
            break;
          case UP:
            newY--;
            break;
        }
        if (newX < rowRange[y].min) {
          if (faceSize === 4)
            switch (faceNumber(x, y)) {
              case 0:
                return [faceSize + y, faceSize, DOWN];
              case 1:
                return [width + faceSize - y - 1, height - 1, UP];
              case 4:
                return [y - faceSize, faceSize * 2 - 1, UP];
              default:
                throw new Error("Invalid face");
            }
          else
            switch (faceNumber(x, y)) {
              case 0:
                return [0, faceSize * 3 - y - 1, RIGHT];
              case 2:
                return [y - faceSize, faceSize * 2, DOWN];
              case 3:
                return [faceSize, faceSize * 3 - y - 1, RIGHT];
              case 5:
                return [y - faceSize * 2, 0, DOWN];
              default:
                throw new Error("Invalid face");
            }
        }
        if (newX > rowRange[y].max) {
          if (faceSize === 4)
            switch (faceNumber(x, y)) {
              case 0:
                return [width - 1, height - y - 1, LEFT];
              case 3:
                return [width + faceSize - y - 1, faceSize * 2, DOWN];
              case 5:
                return [faceSize * 3 - 1, height - y - 1];
              default:
                throw new Error("Invalid face");
            }
          else
            switch (faceNumber(x, y)) {
              case 1:
                return [faceSize * 2 - 1, faceSize * 3 - y - 1, LEFT];
              case 2:
                return [y + faceSize, faceSize - 1, UP];
              case 4:
                return [faceSize * 3 - 1, faceSize * 3 - y - 1, LEFT];
              case 5:
                return [y - faceSize * 2, faceSize * 3 - 1, UP];
              default:
                throw new Error("Invalid face");
            }
        }
        if (newY < colRange[x].min) {
          if (faceSize === 4)
            switch (faceNumber(x, y)) {
              case 0:
                return [faceSize * 3 - x - 1, faceSize, DOWN];
              case 1:
                return [faceSize * 3 - x - 1, 0, DOWN];
              case 2:
                return [faceSize * 2, x - faceSize, RIGHT];
              case 5:
                return [faceSize + width - x - 1, width - faceSize - 1, LEFT];
              default:
                throw new Error("Invalid face");
            }
          else
            switch (faceNumber(x, y)) {
              case 0:
                return [0, x + faceSize * 2, RIGHT];
              case 1:
                return [x - faceSize * 2, height - 1, UP];
              case 3:
                return [faceSize, faceSize + x, RIGHT];
              default:
                throw new Error("Invalid face");
            }
        }
        if (newY > colRange[x].max) {
          if (faceSize === 4)
            switch (faceNumber(x, y)) {
              case 1:
                return [faceSize * 3 - x - 1, height - 1, UP];
              case 2:
                return [faceSize * 2, faceSize + height - x, RIGHT];
              case 4:
                return [faceSize * 3 - x - 1, height - faceSize - 1, UP];
              case 5:
                return [0, faceSize + width - x - 1, RIGHT];
              default:
                throw new Error("Invalid face");
            }
          else
            switch (faceNumber(x, y)) {
              case 1:
                return [faceSize * 2 - 1, x - faceSize, LEFT];
              case 4:
                return [faceSize - 1, x + faceSize * 2, LEFT];
              case 5:
                return [x + faceSize * 2, 0, DOWN];
              default:
                throw new Error("Invalid face");
            }
        }
      } while (!map[newY][newX]);
      return [newX, newY, direction];
    })();

    if (map[newY][newX] === "#") return [x, y, direction];

    return [newX, newY, newDirection];
  };
}
