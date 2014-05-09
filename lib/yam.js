'use strict';

var fs     = require('fs-extra'),
    extend = require('lodash').extend,
    nodefs = require('fs');


function Yam(id, hash) {
  if (!id) { throw new Error('You must specify an id.'); }

  hash = hash || {};

  this.id      = id;
  this.path    = '.' + id;
  this.options = hash.options || {};
  this._internalOptions = {
    force: hash.force || false
  };

  this._createStorageFile();
  this._populateStorageFileContent();

  return this;
}

Yam.prototype._createStorageFile = function _createStorageFile() {
  if (!this._isLazy()) {
    fs.createFileSync(this.path);
  } else {
    this._cache = {};
  }
};

Yam.prototype._populateStorageFileContent = function _populateStorageFileContent(options) {
  var content = options || this.options;
  if (!this._isLazy()) {
    fs.writeJsonSync(this.path, content);
  } else {
    this._cache = content;
  }
};

Yam.prototype._isLazy = function _isLazy() {
  return !this._internalOptions.force;
};

Yam.prototype.get = function get(key) {
  var value;

  if (!this._isLazy()) {
    value = fs.readJsonSync(this.path)[key];
  } else {
    value = this._cache[key];
  }

  return value || null;
};

Yam.prototype.set = function set(key, value) {
  if (!this._isLazy()) {
    var settings = fs.readJsonSync(this.path);
    settings[key] = value;
    this._populateStorageFileContent(settings);
  } else {
    this._cache[key] = value;
  }
};

Yam.prototype.remove = function remove(key) {
  var settings;

  if (!this._isLazy()) {
    settings = fs.readJsonSync(this.path);
  } else {
    settings = this._cache;
  }

  if (!settings[key]) { throw new Error('`' + key + '` doesn\'t exist.'); }

  delete settings[key];

  this._populateStorageFileContent(settings);
};

Yam.prototype.storageExists = function storageExists() {
  return (!this._isLazy()) ? nodefs.existsSync(this.path) : !!this._cache;
};

Yam.prototype.clear = function clear() {
  this._populateStorageFileContent({});
};

function LazyYam(id, path, options) {
  if (!id) { throw new Error('You must specify an id.'); }

  this.id      = id;
  this.path    = path || '.' + id;
  this.options = options || {};
  this._cache  = this.options;

  return this;
}

LazyYam.prototype.relink = function(path) {
  this.path = path;
};

LazyYam.prototype.flush = function() {
  this._createStorageFile(this.path);
  this._populateStorageFileContent(this.path, extend(this.options, this._cache));
  this._cache = {};
};

LazyYam.prototype.get = function(key) {
  return this._cache[key] || null;
};

LazyYam.prototype.set = function(key, value) {
  this._cache[key] = value;
};

module.exports.Yam     = Yam;
module.exports.LazyYam = LazyYam;
