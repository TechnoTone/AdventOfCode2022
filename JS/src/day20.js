module.exports.part1 = (input) => mix(input);

module.exports.part2 = (input) => mix(input, 811589153, 10);

function mix(input, decryptionKey = 1, rounds = 1) {
  const nodeCount = input.length;

  const getNode = (value, id) => ({
    id,
    value: value * decryptionKey,
    next: (id + 1) % nodeCount,
    prev: (id - 1 + nodeCount) % nodeCount,
  });

  const getDestination = (shift, node) => {
    let destination = node;
    let count = Math.abs(shift) % (nodeCount - 1);
    if (shift > 0) {
      while (count--) destination = destination.next;
    } else if (shift < 0) {
      destination = destination.prev;
      while (count--) destination = destination.prev;
    }
    return destination;
  };

  const nodes = input.map(getNode);

  nodes.forEach((n) => {
    n.next = nodes[n.next];
    n.prev = nodes[n.prev];
  });

  while (rounds--)
    input.forEach((_, ix) => {
      if (nodes[ix].value === 0) return;

      const node = nodes[ix];

      //remove node from list
      node.next.prev = node.prev;
      node.prev.next = node.next;

      //insert after destination
      const destination = getDestination(node.value, node);
      node.next = destination.next;
      node.prev = destination;
      node.next.prev = node;
      node.prev.next = node;
    });

  const coordinates = findNodeValues(nodes, [1000, 2000, 3000]);
  return coordinates.reduce((a, b) => a + b, 0);
}

function findNodeValues(nodes, positions) {
  const found = [];
  let node = nodes.find((n) => n.value === 0); //start at node with value 0
  let pos = 0;
  while (positions.length) {
    const next = positions.shift();
    while (pos < next) {
      node = node.next;
      pos++;
    }
    found.push(node.value);
  }
  return found;
}
