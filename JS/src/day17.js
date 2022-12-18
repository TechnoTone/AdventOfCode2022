module.exports.part1 = (input) => {
  return simulationHeight(input, 2022);
};

module.exports.part2 = (input) => {
  return simulationHeight(input, 1000000000000);
};

const rockShapes = [
  "####",
  ".#.\n###\n.#.",
  "..#\n..#\n###",
  "#\n#\n#\n#",
  "##\n##",
];

function simulationHeight(jets, rockCount) {
  const chamber = [];
  let rockIndex = 0;
  let jetIndex = 0;

  const rockCells = rockShapes.map(getRockCells);

  const validPos = (posX, posY, cells) =>
    cells.every(([x, y]) => chamber[posY + y]?.[posX + x] !== "#");

  let lastHeight = 0;
  const heightDiffLog = [];
  const visitHistory = new Map();

  while (rockCount--) {
    const { cells, height, width } = rockCells[rockIndex];

    let posX = 2;
    let posY = chamber.length + 3;

    while (true) {
      const jet = jets[jetIndex];
      jetIndex = (jetIndex + 1) % jets.length;

      switch (jet) {
        case ">":
          if (posX < 7 - width && validPos(posX + 1, posY, cells)) posX++;
          break;
        case "<":
          if (posX > 0 && validPos(posX - 1, posY, cells)) posX--;
          break;
      }

      posY--;
      if (
        posY < 0 ||
        cells.some(([x, y]) => chamber[posY + y]?.[posX + x] === "#")
      ) {
        //landed
        posY++;
        while (chamber.length < posY + height)
          chamber.push(".......".split(""));
        cells.forEach(([x, y]) => (chamber[posY + y][posX + x] = "#"));

        heightDiffLog.push(chamber.length - lastHeight);
        lastHeight = chamber.length;

        const visitId = rockIndex + jetIndex * 5;
        if (visitHistory.has(visitId)) {
          const pastVisits = visitHistory.get(visitId);
          pastVisits.push(heightDiffLog.length - 1);

          if (pastVisits.length > 2) {
            const cycleLength = getCycleLength(pastVisits, heightDiffLog);

            if (cycleLength) {
              const additionalCyclesRequired = Math.floor(
                rockCount / cycleLength
              );
              const remainder = rockCount % cycleLength;

              const additionalCyclesHeight =
                additionalCyclesRequired *
                heightDiffLog.slice(-cycleLength).reduce((a, n) => a + n, 0);

              const remainderHeight = heightDiffLog
                .slice(-cycleLength, remainder - cycleLength)
                .reduce((a, n) => a + n, 0);

              return chamber.length + additionalCyclesHeight + remainderHeight;
            }
          }
        } else {
          visitHistory.set(visitId, [heightDiffLog.length - 1]);
        }

        break;
      }
    }

    rockIndex = (rockIndex + 1) % rockShapes.length;
  }

  return chamber.length;
}

function getRockCells(_, rockIndex) {
  const rock = rockShapes[rockIndex].split("\n");
  rock.reverse();
  const cells = [];
  const height = rock.length;
  const width = rock.map((row) => row.length).reduce((a, b) => Math.max(a, b));
  for (let y = 0; y < rock.length; y++)
    for (let x = 0; x < rock[y].length; x++)
      if (rock[y][x] === "#") cells.push([x, y]);
  return { cells, height, width };
}

function getCycleLength(pastVisits, heightDiffLog) {
  const [i1, i2] = pastVisits.slice(-2);
  const cycleLength = i2 - i1;
  if (
    heightDiffLog.slice(i1 - cycleLength + 1, i1).join("") ===
    heightDiffLog.slice(i2 - cycleLength + 1, i2).join("")
  )
    return cycleLength;
}
