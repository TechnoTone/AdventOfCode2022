module.exports.part1blueprint = (blueprint) => {
  const parsed = parseBlueprint(blueprint);
  const maxGeodes = getMaxGeodes1(parsed, 24);
  return maxGeodes;
};

module.exports.part1 = (input) => {
  const blueprints = parseBlueprints(input);
  return blueprints.reduce(
    (a, bp, ix) => a + (ix + 1) * getMaxGeodes1(bp, 24),
    0
  );
};

module.exports.part2 = (input) => {
  const blueprints = parseBlueprints(input);
  return blueprints.slice(0, 3).reduce((a, bp) => a * getMaxGeodes2(bp, 32), 1);
};

function parseBlueprints(input) {
  return input.map(parseBlueprint);
}

function parseBlueprint(input) {
  // Blueprint 1:
  //   Each ore robot costs 4 ore.
  //   Each clay robot costs 2 ore.
  //   Each obsidian robot costs 3 ore and 14 clay.
  //   Each geode robot costs 2 ore and 7 obsidian.

  const [
    id,
    ore_ore,
    clay_ore,
    obsidian_ore,
    obsidian_clay,
    geode_ore,
    geode_obsidian,
  ] = input.match(/\d+/g).map(Number);

  return {
    id,
    ore_ore,
    clay_ore,
    obsidian_ore,
    obsidian_clay,
    geode_ore,
    geode_obsidian,
  };
}

function getMaxGeodes1(
  { ore_ore, clay_ore, obsidian_ore, obsidian_clay, geode_ore, geode_obsidian },
  minutes
) {
  function canAfford(
    { oreCost = 0, clayCost = 0, obsidianCost = 0 },
    ore,
    clay,
    obsidian
  ) {
    return oreCost <= ore && clayCost <= clay && obsidianCost <= obsidian;
  }

  function craftRobot(
    cost,
    oreProduction,
    clayProduction,
    obsidianProduction,
    minutesRemaining
  ) {
    let { amount: oreAmount, rate: oreRate } = oreProduction;
    let { amount: clayAmount, rate: clayRate } = clayProduction;
    let { amount: obsidianAmount, rate: obsidianRate } = obsidianProduction;

    while (
      minutesRemaining > 0 &&
      !canAfford(cost, oreAmount, clayAmount, obsidianAmount)
    ) {
      oreAmount += oreRate;
      clayAmount += clayRate;
      obsidianAmount += obsidianRate;
      minutesRemaining--;
    }
    oreAmount += oreRate;
    clayAmount += clayRate;
    obsidianAmount += obsidianRate;
    minutesRemaining--;

    oreAmount -= cost.oreCost || 0;
    clayAmount -= cost.clayCost || 0;
    obsidianAmount -= cost.obsidianCost || 0;

    return {
      newOreAmount: oreAmount,
      newClayAmount: clayAmount,
      newObsidianAmount: obsidianAmount,
      newMinutesRemaining: minutesRemaining,
    };
  }

  function res(amount, rate) {
    return { amount, rate };
  }

  function nextOptimalRobot(ore, clay, obsidian, minutesRemaining) {
    const geodes = [0];

    if (minutesRemaining >= 16) {
      let {
        newOreAmount,
        newClayAmount,
        newObsidianAmount,
        newMinutesRemaining,
      } = craftRobot(
        { oreCost: ore_ore },
        ore,
        clay,
        obsidian,
        minutesRemaining
      );
      if (newMinutesRemaining > 0) {
        geodes.push(
          nextOptimalRobot(
            res(newOreAmount, ore.rate + 1),
            res(newClayAmount, clay.rate),
            res(newObsidianAmount, obsidian.rate),
            newMinutesRemaining
          )
        );
      }
    }

    if (minutesRemaining >= 7) {
      let {
        newOreAmount,
        newClayAmount,
        newObsidianAmount,
        newMinutesRemaining,
      } = craftRobot(
        { oreCost: clay_ore },
        ore,
        clay,
        obsidian,
        minutesRemaining
      );
      if (newMinutesRemaining > 0) {
        geodes.push(
          nextOptimalRobot(
            res(newOreAmount, ore.rate),
            res(newClayAmount, clay.rate + 1),
            res(newObsidianAmount, obsidian.rate),
            newMinutesRemaining
          )
        );
      }
    }

    if (minutesRemaining >= 4) {
      let {
        newOreAmount,
        newClayAmount,
        newObsidianAmount,
        newMinutesRemaining,
      } = craftRobot(
        { oreCost: obsidian_ore, clayCost: obsidian_clay },
        ore,
        clay,
        obsidian,
        minutesRemaining
      );
      if (newMinutesRemaining > 0) {
        geodes.push(
          nextOptimalRobot(
            res(newOreAmount, ore.rate),
            res(newClayAmount, clay.rate),
            res(newObsidianAmount, obsidian.rate + 1),
            newMinutesRemaining
          )
        );
      }
    }

    if (minutesRemaining >= 2) {
      let {
        newOreAmount,
        newClayAmount,
        newObsidianAmount,
        newMinutesRemaining,
      } = craftRobot(
        { oreCost: geode_ore, obsidianCost: geode_obsidian },
        ore,
        clay,
        obsidian,
        minutesRemaining
      );
      if (newMinutesRemaining > 0) {
        geodes.push(
          newMinutesRemaining +
            nextOptimalRobot(
              res(newOreAmount, ore.rate),
              res(newClayAmount, clay.rate),
              res(newObsidianAmount, obsidian.rate),
              newMinutesRemaining
            )
        );
      }
    }

    return Math.max(...geodes);
  }

  return nextOptimalRobot(
    { rate: 1, amount: 0 },
    { rate: 0, amount: 0 },
    { rate: 0, amount: 0 },
    minutes
  );
}

function getMaxGeodes2(
  { ore_ore, clay_ore, obsidian_ore, obsidian_clay, geode_ore, geode_obsidian },
  minutes
) {
  function canAfford(
    { oreCost = 0, clayCost = 0, obsidianCost = 0 },
    ore,
    clay,
    obsidian
  ) {
    return oreCost <= ore && clayCost <= clay && obsidianCost <= obsidian;
  }

  function craftRobot(
    cost,
    oreProduction,
    clayProduction,
    obsidianProduction,
    minutesRemaining
  ) {
    let { amount: oreAmount, rate: oreRate } = oreProduction;
    let { amount: clayAmount, rate: clayRate } = clayProduction;
    let { amount: obsidianAmount, rate: obsidianRate } = obsidianProduction;

    while (
      minutesRemaining > 0 &&
      !canAfford(cost, oreAmount, clayAmount, obsidianAmount)
    ) {
      oreAmount += oreRate;
      clayAmount += clayRate;
      obsidianAmount += obsidianRate;
      minutesRemaining--;
    }
    oreAmount += oreRate;
    clayAmount += clayRate;
    obsidianAmount += obsidianRate;
    minutesRemaining--;

    oreAmount -= cost.oreCost || 0;
    clayAmount -= cost.clayCost || 0;
    obsidianAmount -= cost.obsidianCost || 0;

    return {
      newOreAmount: oreAmount,
      newClayAmount: clayAmount,
      newObsidianAmount: obsidianAmount,
      newMinutesRemaining: minutesRemaining,
    };
  }

  function res(amount, rate) {
    return { amount, rate };
  }

  function nextOptimalRobot(ore, clay, obsidian, minutesRemaining) {
    const geodes = [0];

    if (minutesRemaining >= 24) {
      let {
        newOreAmount,
        newClayAmount,
        newObsidianAmount,
        newMinutesRemaining,
      } = craftRobot(
        { oreCost: ore_ore },
        ore,
        clay,
        obsidian,
        minutesRemaining
      );
      if (newMinutesRemaining > 0) {
        geodes.push(
          nextOptimalRobot(
            res(newOreAmount, ore.rate + 1),
            res(newClayAmount, clay.rate),
            res(newObsidianAmount, obsidian.rate),
            newMinutesRemaining
          )
        );
      }
    }

    if (minutesRemaining >= 15) {
      let {
        newOreAmount,
        newClayAmount,
        newObsidianAmount,
        newMinutesRemaining,
      } = craftRobot(
        { oreCost: clay_ore },
        ore,
        clay,
        obsidian,
        minutesRemaining
      );
      if (newMinutesRemaining > 0) {
        geodes.push(
          nextOptimalRobot(
            res(newOreAmount, ore.rate),
            res(newClayAmount, clay.rate + 1),
            res(newObsidianAmount, obsidian.rate),
            newMinutesRemaining
          )
        );
      }
    }

    if (minutesRemaining >= 5) {
      let {
        newOreAmount,
        newClayAmount,
        newObsidianAmount,
        newMinutesRemaining,
      } = craftRobot(
        { oreCost: obsidian_ore, clayCost: obsidian_clay },
        ore,
        clay,
        obsidian,
        minutesRemaining
      );
      if (newMinutesRemaining > 0) {
        geodes.push(
          nextOptimalRobot(
            res(newOreAmount, ore.rate),
            res(newClayAmount, clay.rate),
            res(newObsidianAmount, obsidian.rate + 1),
            newMinutesRemaining
          )
        );
      }
    }

    if (minutesRemaining >= 2) {
      let {
        newOreAmount,
        newClayAmount,
        newObsidianAmount,
        newMinutesRemaining,
      } = craftRobot(
        { oreCost: geode_ore, obsidianCost: geode_obsidian },
        ore,
        clay,
        obsidian,
        minutesRemaining
      );
      if (newMinutesRemaining > 0) {
        geodes.push(
          newMinutesRemaining +
            nextOptimalRobot(
              res(newOreAmount, ore.rate),
              res(newClayAmount, clay.rate),
              res(newObsidianAmount, obsidian.rate),
              newMinutesRemaining
            )
        );
      }
    }

    return Math.max(...geodes);
  }

  return nextOptimalRobot(
    { rate: 1, amount: 0 },
    { rate: 0, amount: 0 },
    { rate: 0, amount: 0 },
    minutes
  );
}

// 1  2 4 7 16   24
// 2  2 5 15 24  32
