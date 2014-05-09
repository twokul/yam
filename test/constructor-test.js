'use strict';

var assert = require('chai').assert,
    Yam    = require('../lib/yam'),
    fs     = require('fs'),
    yam;

describe('Constructor', function() {
  var path = '.test';

  afterEach(function() {
    if (fs.existsSync(path)) {
      fs.unlinkSync(path);
    }
  });

  it('shouldn\'t create a config file by default', function() {
    yam = new Yam('test');
    assert.ok(!fs.existsSync(path));
  });

  describe('no `force` option', function() {
    it('creates cache', function() {
      yam = new Yam('test');
      assert.ok(!fs.existsSync(path));
      assert.ok(yam._cache);
    });

    it('should set the values in the cache', function() {
      fs.openSync(path, 'w');
      yam = new Yam('test', {
        options: {
          foo: 'bar'
        }
      });
      assert.equal(yam.path, path);
      assert.equal(yam.get('foo'), 'bar');
    });
  });

  describe('with `force` option', function() {
    it('should create a config file if it doesn\'t exist', function() {
      yam = new Yam('test', {
        force: true
      });
      assert.ok(fs.existsSync(path));
    });

    it('should use an existing config file if it exist', function() {
      fs.openSync(path, 'w');
      yam = new Yam('test', {
        force: true,
        options: {
          foo: 'bar'
        }
      });
      assert.equal(yam.path, path);
      assert.equal(yam.get('foo'), 'bar');
    });

    it('should throw an exception if `id` is not specified', function() {
      assert.throws(function() {
        yam = new Yam();
      }, 'You must specify an id.');
    });

    it('should create a default storage file if `path` wasn\'t specified', function() {
      yam = new Yam('test', {
        force: true
      });
      assert.ok(fs.existsSync(path));
    });

    it('should create a config file and populate it with `options`', function() {
      yam = new Yam('test', {
        force: true,
        options: {
          foo: 'bar'
        }
      });

      assert.ok(fs.existsSync(path));
      assert.equal(yam.get('foo'), 'bar');
    });
  });
});
