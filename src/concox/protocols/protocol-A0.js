//Protocol Location

const { parserPackageComponents } = require("../common");
const dateTime = require("../dateTime");
const location = require("../tables/location");
const cell = require("../cell");

module.exports.parse = function (buffer) {
  let [dateTimeBuffer, locationBuffer, data] = parserPackageComponents(
    buffer,
    [6, 12],
    true
  );

  let cellObject = cell.parse(data);

  let [reupload, uploadmode, acc, mileage] = parserPackageComponents(
    cell.remove(data),
    [1, 1, 1, 4]
  );

  return {
    typeName: "Location",
    typeId: "A0",

    timeStamp: dateTime.parse(dateTimeBuffer),
    location: location.parse(locationBuffer),
    cell: cellObject,
    reupload: reupload,
    uploadmode: uploadmode,
    acc: acc,
    mileage: mileage.readUInt32BE(),
  };
};
