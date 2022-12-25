module.exports.part1 = (input) => {
  const values = input.map(snafuToDecimal);
  const sum = values.reduce((a, b) => a + b, 0);

  return decimalToSnafu(sum);
};

module.exports.part2 = (input) => {
  return 0;
};

function snafuToDecimal(snafu) {
  const val = {
    "=": -2,
    "-": -1,
    0: 0,
    1: 1,
    2: 2,
  };

  const digits = snafu.split("");
  let result = 0;
  let col = 1;
  while (digits.length) {
    const digit = digits.pop();
    result += val[digit] * col;
    col *= 5;
  }

  return result;
}

function decimalToSnafu(decimal) {
  const snafu = {
    "-2": "=",
    "-1": "-",
    0: 0,
    1: 1,
    2: 2,
  };

  let col = 1;
  while (5 ** col * 3 - 1 < decimal) col++;

  let result = "";
  while (col >= 0) {
    const closest = [-2, -1, 0, 1, 2]
      .map((x) => ({
        x,
        diff: Math.abs(decimal - 5 ** col * x),
      }))
      .sort((a, b) => a.diff - b.diff)[0].x;

    decimal -= 5 ** col * closest;
    result += snafu[closest];
    col--;
  }

  return result;
}
