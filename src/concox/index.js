"use strict";

const { removeLayer0, addLayer0 } = require("./layer0");
const protocols = require("./protocols");

module.exports.parse = function (buffer) {
  return protocols.parse(removeLayer0(buffer));
};

module.exports.response = function (protocol, sequence, buffer = null) {
  if (!buffer) buffer = Buffer.alloc(0);

  return addLayer0(protocols.response(protocol, sequence, buffer));
};
