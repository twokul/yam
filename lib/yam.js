'use strict';

var fs     = require('fs-extra'),
    extend = require('lodash').extend,
    nodefs = require('fs');

function createStorageFile(options) {
  if (!options.isLazy) {
    fs.createFileSync(options.path);
  }
}

function populateStorageFileContent(opts) {
  if (!opts.isLazy) {
    fs.writeJsonSync(opts.path, opts.options);
  }
}

function Yam(id, yamOptions, options) {
  if (!id) { throw new Error('You must specify an id.'); }

  this.id      = id;
  this.path    = '.' + id;
  this.options = options || {};

  this._setInternalOptions(yamOptions, options);

  return this;
}

Yam.prototype._setInternalOptions = function _setInternalOptions(yamOptions, options) {
  this._internalOptions = yamOptions || {};

  // this should happen automatically
  createStorageFile({
    path:   this.path,
    isLazy: this._isLazy()
  });

  // this should happen automatically
  populateStorageFileContent({
    path:    this.path,
    isLazy:  this._isLazy(),
    options: options
  });
};

Yam.prototype._isLazy = function _isLazy() {
  return !this._internalOptions.force;
};

Yam.prototype.get = function get(key) {
  var settings = fs.readJsonSync(this.path);
  return settings[key] || null;
};

Yam.prototype.set = function set(key, value) {
  var settings = fs.readJsonSync(this.path);
  settings[key] = value;
  populateStorageFileContent(this.path, settings);
};

Yam.prototype.remove = function remove(key) {
  var settings = fs.readJsonSync(this.path);
  if (!settings[key]) { throw new Error('`' + key + '` doesn\'t exist.'); }
  delete settings[key];
  populateStorageFileContent(this.path, settings);
};

Yam.prototype.storageExists = function storageExists() {
  return nodefs.existsSync(this.path);
};

Yam.prototype.clear = function clear() {
  populateStorageFileContent(this.path, {});
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
  createStorageFile(this.path);
  populateStorageFileContent(this.path, extend(this.options, this._cache));
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
