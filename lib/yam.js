'use strict';

var config = require('./utils/config-file-utils'),
    fs     = require('fs-extra'),
    p      = require('path'),
    merge  = require('lodash').merge,
    nodefs = require('fs');

function Yam(id, hash) {
  if (!id) { throw new Error('You must specify an id.'); }

  hash = hash || {};

  this.id       = id;
  this.path     = (hash.path) ? p.normalize(hash.path + '/.' + id) : '.' + id;
  this.homePath = (hash.homePath) ? p.normalize(hash.homePath + '/.' + id)
                                         : p.normalize(config.getUserHome() + '/.' + id);
  this.options  = hash.options || {};

  this._internalOptions = {
    force: hash.force || false
  };

  this._createStorageFile();
  this._populateStorageFileContent();

  return this;
}

Yam.prototype.flush = function flush() {
  if (this._isLazy()) {
    config.write(this.path, this._cache);
  }
};

Yam.prototype._createStorageFile = function _createStorageFile() {
  if (!this._isLazy()) {
    config.create(this.path);
  } else {
    var options = merge(config.read(this.homePath) || {}, config.read(this.path));
    this._cache = merge(options || {}, this.options);
  }
};

Yam.prototype._populateStorageFileContent = function _populateStorageFileContent(options) {
  var content = options || this.options;
  if (!this._isLazy()) {
    config.write(this.path, content);
  } else {
    this._cache = merge(this._cache, content);
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

Yam.prototype.getAll = function getAll() {
  return this._cache;
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

module.exports = Yam;
