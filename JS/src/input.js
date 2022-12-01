const fs = require("fs");

class Input {
  data;

  constructor(n) {
    n = ("0" + n.toString()).slice(-2);
    this.data = fs.readFileSync(`day${n}.txt`, "utf-8");
  }

  fromLines() {
    this.data = this.data.split(/\r?\n/);
    return this;
  }

  get() {
    return this.data;
  }

  asIntArray() {
    return this.data.map((x) => Number(x));
  }
}

module.exports = Input;
