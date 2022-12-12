module.exports.part1 = (input) => shortestRouteUp(parseMap(input));
module.exports.part2 = (input) => shortestRouteDown(parseMap(input));

parseMap = (input) => {
  const map = input.join("");
  const width = input[0].length;
  const start = map.indexOf("S");
  const end = map.indexOf("E");

  const heightMap = map
    .replace("S", "a")
    .replace("E", "z")
    .split("")
    .map((c) => c.charCodeAt());

  return [width, start, end, heightMap];
};

shortestRouteUp = ([width, start, end, map]) => {
  const scouts = [[start, 0]];
  const visited = new Set([start]);

  while (scouts.length) {
    const [position, steps] = scouts.shift();

    const next = [width, 1, -width, -1]
      .map((n) => position + n)
      .filter((n) => map[n] <= map[position] + 1 && !visited.has(n));

    if (next.includes(end)) return steps + 1;

    next.forEach((n) => {
      visited.add(n);
      scouts.push([n, steps + 1]);
    });
  }

  return 0;
};

shortestRouteDown = ([width, , end, map]) => {
  const scouts = [[end, 0]];
  const visited = new Set([end]);

  while (scouts.length) {
    const [position, steps] = scouts.shift();

    const next = [width, 1, -width, -1]
      .map((n) => position + n)
      .filter((n) => map[n] >= map[position] - 1 && !visited.has(n));

    if (next.some((n) => map[n] == 97)) return steps + 1;

    next.forEach((n) => {
      visited.add(n);
      scouts.push([n, steps + 1]);
    });
  }

  return 0;
};
