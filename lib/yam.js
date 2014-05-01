'use strict';

var fs = require('fs-extra');

function createStorageFile(path) {
  fs.createFileSync(path);
}

function populateStorageFileContent(path, options) {
  fs.writeJsonSync(path, options);
}

function Yam(id, path, options) {
  if (!id) { throw new Error('You must specify an id.'); }

  this.id      = id;
  this.path    = path || '.settings';
  this.options = options || {};

  createStorageFile(this.path);
  populateStorageFileContent(this.path, this.options);

  return this;
}

Yam.prototype.get = function(key) {
  var settings = fs.readJsonSync(this.path);
  return settings[key] || null;
};

Yam.prototype.set = function(key, value) {
  var settings = fs.readJsonSync(this.path);
  settings[key] = value;
  populateStorageFileContent(this.path, settings);
};

Yam.prototype.remove = function(key) {
  var settings = fs.readJsonSync(this.path);
  if (!settings[key]) { throw new Error('`' + key + '` doesn\'t exist.'); }
  delete settings[key];
  populateStorageFileContent(this.path, settings);
};

Yam.prototype.clear = function() {
  populateStorageFileContent(this.path, {});
};

function LazyYam(id, path, options) {
  if (!id) { throw new Error('You must specify an id.'); }

  this.id      = id;
  this.path    = path || '.settings';
  this.options = options || {};

  return this;
}

LazyYam.prototype = Object.create(Yam.prototype);
LazyYam.prototype.constructor = LazyYam;
LazyYam.__proto__ = Yam;

LazyYam.prototype.link = function(path) {
  this.path = path;

  createStorageFile(this.path);
  populateStorageFileContent(this.path, this.options);
};

module.exports = { Yam: Yam, LazyYam: LazyYam };
