module.exports.part1 = (input) => topCrates(move(parseInput(input)));
module.exports.part2 = (input) => topCrates(move(parseInput(input), true));

parseInput = (input) => {
  const moves = [];
  const stacks = new Array(9).fill().map((_) => []);
  input.forEach((line) => {
    if (line.startsWith("move")) {
      moves.push(line);
    } else if (line.trimStart().startsWith("[")) {
      for (let i = 0; i < 9; i++) {
        const crate = line[i * 4 + 1];
        if (crate && crate !== " ") {
          stacks[i].unshift(crate);
        }
      }
    }
  });
  return { stacks, moves };
};

const move = ({ stacks, moves }, moveMultiple) => {
  moves.forEach((move) => {
    const [_move, quantity, from, to] = move.match(
      /move (\d+) from (\d+) to (\d+)/
    );
    if (moveMultiple)
      stacks[to - 1].push(...stacks[from - 1].splice(-quantity, quantity));
    else
      for (let i = 0; i < quantity; i++) {
        stacks[to - 1].push(stacks[from - 1].pop());
      }
  });
  return stacks;
};

const topCrates = (stacks) => stacks.map((s) => s[s.length - 1]).join("");
