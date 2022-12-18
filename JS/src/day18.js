module.exports.part1 = (input) => totalSurfaceArea(input);
module.exports.part2 = (input) => externalSurfaceArea(input);

function totalSurfaceArea(input) {
  const cubes = new Set(input);
  return input.reduce(
    (acc, c) => acc + cubeNeighbours(c).filter((n) => !cubes.has(n)).length,
    0
  );
}

function externalSurfaceArea(input) {
  const cubes = new Set(input);
  const shell = input.reduce(
    (acc, c) => [...acc, ...cubeNeighbours(c).filter((n) => !cubes.has(n))],
    []
  );

  const xyzs = input.reduce(
    ([xs, ys, zs], c) => {
      const [x, y, z] = c.split(",").map(Number);
      return [
        [...xs, x],
        [...ys, y],
        [...zs, z],
      ];
    },
    [[], [], []]
  );

  const range = {
    minX: Math.min(...xyzs[0]),
    minY: Math.min(...xyzs[1]),
    minZ: Math.min(...xyzs[2]),
    maxX: Math.max(...xyzs[0]),
    maxY: Math.max(...xyzs[1]),
    maxZ: Math.max(...xyzs[2]),
  };

  const externalShellSet = new Set();
  const internalSpaces = new Set();

  shell.forEach((cube) => {
    if (internalSpaces.has(cube)) return;
    if (externalShellSet.has(cube)) return;

    const visited = new Set();
    const edges = [cube];

    while (edges.length > 0) {
      const edge = edges.pop();
      visited.add(edge);
      const neighbours = cubeNeighbours(edge).filter(
        (n) => !cubes.has(n) && !visited.has(n)
      );
      if (
        neighbours.some((n) => externalShellSet.has(n) || beyondRange(range, n))
      ) {
        externalShellSet.add(edge);
        return;
      }
      const newNeighbours = neighbours.filter((n) => !visited.has(n));
      edges.push(...newNeighbours);
    }
    [...visited].forEach((v) => internalSpaces.add(v));
  });

  return shell.filter((s) => !internalSpaces.has(s)).length;
}

function cubeNeighbours(cubeStr) {
  const [x, y, z] = cubeStr.split(",").map(Number);
  return [
    [x + 1, y, z],
    [x - 1, y, z],
    [x, y + 1, z],
    [x, y - 1, z],
    [x, y, z + 1],
    [x, y, z - 1],
  ].map((c) => c.join(","));
}

function beyondRange(range, cubeStr) {
  const [x, y, z] = cubeStr.split(",").map(Number);
  return (
    x < range.minX ||
    y < range.minY ||
    z < range.minZ ||
    x > range.maxX ||
    y > range.maxY ||
    z > range.maxZ
  );
}
