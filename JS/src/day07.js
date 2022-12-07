module.exports.part1 = (input) => {
  const directories = readTerminal(input);

  var result = 0;
  for (var key in directories)
    if (directories[key] < 100000) result += directories[key];

  return result;
};

module.exports.part2 = (input) => {
  const directories = readTerminal(input);

  const totalSize = directories["/"];
  const freeSpace = 70000000 - totalSize;
  const spaceRequired = 30000000 - freeSpace;

  var result = totalSize;
  for (var key in directories)
    if (directories[key] > spaceRequired && directories[key] < result)
      result = directories[key];

  return result;
};

function readTerminal(input) {
  const directories = {};
  const dirStack = [];

  function addFileSizeToAllParentDirectories(fileSize) {
    for (let i = 0; i < dirStack.length; i++) {
      const dir = dirStack.slice(0, i + 1).join("/");
      if (directories[dir]) directories[dir] += fileSize;
      else directories[dir] = fileSize;
    }
  }

  for (const line of input) {
    const words = line.split(" ");
    switch (words[0]) {
      case "$":
        if (words[1] === "cd") {
          if (words[2] === "..") dirStack.pop();
          else dirStack.push(words[2]);
        }
        break;
      case "dir":
        //ignore - directories have no size
        break;
      default:
        const fileSize = parseInt(words[0]);
        addFileSizeToAllParentDirectories(fileSize);
    }
  }
  return directories;
}
