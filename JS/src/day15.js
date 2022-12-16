module.exports.part1 = (input, row) => {
  const sensors = parseInput(input);
  return getRowCount(sensors, row);
  //TODO - try to use ranges to optimise
};

module.exports.part2 = (input, maxXorY) => {
  const sensors = parseInput(input);

  const check = (x, y) => {
    return (
      x >= 0 &&
      x <= maxXorY &&
      y >= 0 &&
      y <= maxXorY &&
      !sensors.some((s) => distance([x, y], s.pos) <= s.range)
    );
  };

  const score = (x, y) => x * 4000000 + y;

  for (let i = 0; i < sensors.length; i++) {
    const { pos, range } = sensors[i];
    for (let n = 0; n <= range + 1; n++) {
      if (check(pos[0] + n, pos[1] - (range + 1) + n))
        return score(pos[0] + n, pos[1] - (range + 1) + n); //NE edge
      if (check(pos[0] + n, pos[1] + (range + 1) - n))
        return score(pos[0] + n, pos[1] + (range + 1) + n); //SE edge
      if (check(pos[0] - n, pos[1] + (range + 1) - n))
        return score(pos[0] - n, pos[1] + (range + 1) + n); //SW edge
      if (check(pos[0] - n, pos[1] - (range + 1) + n))
        return score(pos[0] - n, pos[1] - (range + 1) + n); //NW edge
    }
  }
};

function parseInput(input) {
  function parseXY(s) {
    const [, x, y] = s.match(/.*=(.*), y=(.*)/);
    return [Number(x), Number(y)];
  }

  const sensors = [];
  input.forEach((line) => {
    const [sensorPos, beaconPos] = line.split(": ").map(parseXY);

    const sensor = {
      pos: sensorPos,
      beacon: beaconPos,
      range: distance(sensorPos, beaconPos),
    };

    sensors.push(sensor);
  });
  return sensors;
}

function distance(a, b) {
  return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
}

function getRowCount(sensors, row) {
  function isNotBeacon(x, y, sensors) {
    return sensors.some(
      (s) =>
        (s.beacon[0] !== x || s.beacon[1] !== y) &&
        distance([x, y], s.pos) <= s.range
    );
  }
  const xRange = sensors.reduce((acc, s) => {
    if (s.pos[0] - s.range < acc[0]) acc[0] = s.pos[0] - s.range;
    if (s.pos[0] + s.range > acc[1]) acc[1] = s.pos[0] + s.range;
    return acc;
  }, sensors[0].pos);
  let count = 0;
  for (let x = xRange[0]; x <= xRange[1]; x++) {
    if (isNotBeacon(x, row, sensors)) count++;
  }
  return count;
}

const posStr = (posX, posY) => `${posX},${posY}`;

function getCandidatePositions({ pos, range }, maxXorY, sensors) {
  function isNotBeacon(x, y, sensors) {
    return sensors.some((s) => distance([x, y], s.pos) <= s.range);
  }

  const candidates = new Set();

  const push = (x, y) => {
    if (
      x >= 0 &&
      x <= maxXorY &&
      y >= 0 &&
      y <= maxXorY &&
      !isNotBeacon(x, y, sensors)
    )
      candidates.add(posStr(x, y));
  };

  //get manhattan edges of sensor range+1
  for (let n = 0; n <= range + 1; n++) {
    push(pos[0] + n, pos[1] - (range + 1) + n); //NE edge
    push(pos[0] + n, pos[1] + (range + 1) - n); //SE edge
    push(pos[0] - n, pos[1] + (range + 1) - n); //SW edge
    push(pos[0] - n, pos[1] - (range + 1) + n); //NW edge
  }
  return candidates;
}
