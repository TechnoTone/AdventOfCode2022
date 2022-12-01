module.exports.part1 = function (input) {
  return getCalories(input)[0];
};
module.exports.part2 = function (input) {
  const [e1, e2, e3] = getCalories(input);
  return e1 + e2 + e3;
};

function getCalories(input) {
  const calories = [0];

  input.forEach((n) => {
    if (n == 0) {
      calories.push(0);
    } else calories[calories.length - 1] += n;
  });

  return calories.sort((a, b) => b - a);
}
