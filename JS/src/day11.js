module.exports.part1 = (input) => doRounds(parseInput(input), 20);
module.exports.part2 = (input) => doRounds(parseInput(input), 10000, false);

function doRounds(monkeys, rounds, relief = true) {
  const testLimit = monkeys.reduce((acc, m) => acc * m.test, 1);

  const itemUpdate = relief
    ? (item, opFn) => Math.trunc(opFn(item) / 3) % testLimit
    : (item, opFn) => opFn(item) % testLimit;

  const monkeyTurn = (monkey) => {
    monkey.inspectionCount += monkey.items.length;
    while (monkey.items.length) {
      const item = itemUpdate(monkey.items.shift(), monkey.operation);

      if (item % monkey.test === 0) monkeys[monkey.throwTrue].items.push(item);
      else monkeys[monkey.throwFalse].items.push(item);
    }
  };

  while (rounds--) monkeys.forEach(monkeyTurn);

  return monkeys
    .map((m) => m.inspectionCount)
    .sort((a, b) => a - b)
    .slice(-2)
    .reduce((a, b) => a * b);
}

const parseInput = (input) =>
  input
    .replace("\r", "")
    .split("\n\n")
    .map((l) => l.split("\n").map((l) => l.split(": ")[1]))
    .map(parseMonkey);

const parseMonkey = ([
  ,
  itemsStr,
  opStr,
  testStr,
  throwTrueStr,
  throwFalseStr,
]) => ({
  items: itemsStr.split(", ").map(Number),
  operation: getOperation(opStr),
  test: Number(testStr.split(" ")[2]),
  throwTrue: Number(throwTrueStr.split(" ")[3]),
  throwFalse: Number(throwFalseStr.split(" ")[3]),
  inspectionCount: 0,
});

function getOperation(operationString) {
  const [, , , operator, right] = operationString.split(" ");
  switch (operator) {
    case "+":
      if (right === "old") return (old) => old + old;
      return (old) => old + Number(right);
    case "*":
      if (right === "old") return (old) => old * old;
      return (old) => old * Number(right);
    default:
      throw new Error(`Unknown operator ${operator}`);
  }
}
