module.exports.part1 = (input) =>
  solver(incrementCycle1, {
    cycle: 0,
    x: 1,
    nextToFind: 20,
    total: 0,
  })(input).total;

module.exports.part2 = (input) =>
  solver(incrementCycle2, {
    cycle: 0,
    x: 1,
    output: "",
  })(input).output.match(/.{1,40}/g);

const solver = (incrementCycleFn, startState) => (input) =>
  input.reduce((state, curr) => {
    if (curr === "noop") return incrementCycleFn(1, state);
    return incrementX(Number(curr.slice(5)), incrementCycleFn(2, state));
  }, startState);

const incrementX = (amount, state) => ({ ...state, x: state.x + amount });

const incrementTotal = (state) => ({
  ...state,
  nextToFind: state.nextToFind + 40,
  total: state.total + state.x * state.nextToFind,
});

const incrementCycle1 = (amount, state) =>
  state.cycle + amount >= state.nextToFind
    ? {
        ...incrementTotal(state),
        cycle: state.cycle + amount,
      }
    : {
        ...state,
        cycle: state.cycle + amount,
      };

const incrementCycle2 = (amount, { cycle, x, output }) => {
  while (amount--) {
    cycle++;
    const pos = (cycle - 1) % 40;
    output += pos >= x - 1 && pos < x + 2 ? "#" : ".";
  }
  return { cycle, x, output };
};
