const { sliceByte } = require("../../trash/tras");

module.exports.getFlagFromByte = function (byte, index) {
  return byte.toString(2).padStart(8, 0)[7 - index] == 1;
};

module.exports.parserPackageComponents = function (
  buffer,
  map,
  allowNotFullUse = false
) {
  let output = [];

  map.forEach((element) => {
    let value = buffer.subarray(0, element);
    buffer = buffer.subarray(element);
    output.push(value);
  });

  if (buffer.length != 0) {
    if (allowNotFullUse) {
      output.push(buffer);
    } else {
      exports.throwError("Map Invalid", buffer);
    }
  }

  return output;
};

module.exports.throwError = function (message, buffer) {
  throw new Error(message + ": " + buffer.toString("hex"));
};

};
