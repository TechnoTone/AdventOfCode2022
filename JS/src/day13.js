module.exports.part1 = (input) => {
  return parsePacketList(input).reduce(pair, []).reduce(sumInOrderIndices, 0);
};

const sumInOrderIndices = (acc, packet, ix) =>
  acc + (compare(...packet) < 0 ? ix + 1 : 0);

module.exports.part2 = (input) => {
  const packets = parsePacketList(input);
  const dividers = [[[2]], [[6]]];
  packets.push(...dividers);

  packets.sort(compare);

  return dividers
    .map((d) => packets.indexOf(d) + 1)
    .reduce((acc, ix) => acc * ix, 1);
};

const parsePacketList = (input) =>
  input.filter((s) => s !== "").map(parsePacket);

const parsePacket = (input) => JSON.parse(input);

const pair = (acc, packet) => {
  if (acc.length > 0 && acc[acc.length - 1].length === 1)
    acc[acc.length - 1].push(packet);
  else acc.push([packet]);
  return acc;
};

const isNumber = (x) => typeof x === "number";

function compare(left, right) {
  if (isNumber(left) && isNumber(right)) return left - right;

  if (!Array.isArray(left)) return compare([left], right);
  if (!Array.isArray(right)) return compare(left, [right]);

  if (!left.length && !right.length) return 0;
  if (!left.length && right.length) return -1;
  if (left.length && !right.length) return 1;

  const [l, ...ls] = left;
  const [r, ...rs] = right;
  const comp = compare(l, r);
  return comp === 0 ? compare(ls, rs) : comp;
}
