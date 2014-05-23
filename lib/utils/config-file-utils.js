'use strict';

var fs = require('fs-extra');

var createFile = function createFile(path) {
  if (path && typeof path === 'string') {
    return fs.createFileSync(path);
  }
  return;
}

var deleteIfExists = function deleteIfExists(path) {
  if (fs.existsSync(path)) {
    return fs.unlinkSync(path);
  }
};

var exists = function exists(path) {
  return fs.existsSync(path);
};

var openFile = function openFile(path) {
  return fs.outputFile(path);
};

var writeFile = function writeFile(path, obj) {
  if (path && typeof path === 'string' && obj) {
    return fs.writeJsonSync(path, obj);
  }
  return;
}

var getUserHome = function getUserHome() {
  return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
}

var readFile = function readFile(path) {
  if (!exists(path)) { return null; }

  return fs.readJsonSync(path);
};

module.exports.create         = createFile;
module.exports.write          = writeFile;
module.exports.open           = openFile;
module.exports.read           = readFile;
module.exports.exists         = exists;
module.exports.deleteIfExists = deleteIfExists;
module.exports.getUserHome    = getUserHome;
