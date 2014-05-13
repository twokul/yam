'use strict';

var fs = require('fs-extra');

var deleteIfExists = function(path) {
  if (fs.existsSync(path)) {
    return fs.unlinkSync(path);
  }
};

var exists = function(path) {
  return fs.existsSync(path);
};

var open = function(path) {
  return fs.outputFile(path);
};

var read = function(path) {
  return fs.readJsonSync(path);
};

module.exports = {
  deleteIfExists: deleteIfExists,
  exists:         exists,
  open:           open,
  read:           read
};
