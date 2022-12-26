module.exports.part1 = (input) => {
  const { monkeysSolved, monkeysToSolve } = parseMonkeys(input);

  while (!monkeysSolved["root"]) {
    for (const monkey of Object.keys(monkeysToSolve)) {
      const [left, operation, right] = monkeysToSolve[monkey];
      if (monkeysSolved[left] && monkeysSolved[right]) {
        monkeysSolved[monkey] = processOperation(
          monkeysSolved[left],
          operation,
          monkeysSolved[right]
        );
        delete monkeysToSolve[monkey];
      }
    }
  }

  return monkeysSolved["root"];
};

module.exports.part2 = (input) => {
  const { monkeysSolved, monkeysToSolve } = parseMonkeys(input);
  delete monkeysSolved["humn"];

  const resolved = (monkey) => Object.hasOwn(monkeysSolved, monkey);

  //solve what we can without involving "humn"
  let updated = false;
  do {
    updated = false;
    for (const monkey of Object.keys(monkeysToSolve)) {
      if (monkey === "root") continue;
      const [left, operation, right] = monkeysToSolve[monkey];
      if (
        left !== "humn" &&
        right !== "humn" &&
        resolved(left) &&
        resolved(right)
      ) {
        updated = true;
        monkeysSolved[monkey] = processOperation(
          monkeysSolved[left],
          operation,
          monkeysSolved[right]
        );
        delete monkeysToSolve[monkey];
      }
    }
  } while (updated);

  const [rootLeft, , rootRight] = monkeysToSolve["root"];
  let requiredValue = resolved(rootLeft)
    ? monkeysSolved[rootLeft]
    : monkeysSolved[rootRight];
  let nextMonkey = resolved(rootLeft) ? rootRight : rootLeft;

  requiredValue = requiredValue;

  while (nextMonkey !== "humn") {
    const [left, operation, right] = monkeysToSolve[nextMonkey];
    const nextRequiredValue = processInverseOperation(
      requiredValue,
      Number(monkeysSolved[left]),
      operation,
      Number(monkeysSolved[right])
    );

    requiredValue = nextRequiredValue;

    nextMonkey = resolved(left) ? right : left;
  }

  return requiredValue;
};

function parseMonkeys(input) {
  const monkeysToSolve = {};
  const monkeysSolved = {};
  for (const line of input) {
    const [name, value] = line.split(": ");
    const [left, operation, right] = value.split(" ");
    if (Number(left)) monkeysSolved[name] = Number(left);
    else monkeysToSolve[name] = [left, operation, right];
  }
  return { monkeysSolved, monkeysToSolve };
}

function processOperation(left, operation, right) {
  if (operation === "+") return left + right;
  if (operation === "-") return left - right;
  if (operation === "*") return left * right;
  if (operation === "/") return left / right;
  if (operation === "=") return left === right;
}

function processInverseOperation(answer, left, operation, right) {
  switch (operation) {
    case "+":
      return answer - (isNaN(left) ? right : left);
    case "*":
      return answer / (isNaN(left) ? right : left);
    case "-":
      return isNaN(left) ? answer + right : left - answer;
    case "/":
      return isNaN(left) ? answer * right : left / answer;
    default:
      throw new Error(`Unknown operation ${operation}`);
  }
}
