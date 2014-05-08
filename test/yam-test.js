'use strict';

var assert = require('chai').assert,
    Yam    = require('../lib/yam').Yam,
    fs     = require('fs'),
    yam;

describe('Yam', function() {
  it('exists', function() {
    assert.ok(Yam);
  });

  it('public API methods exist', function() {
    yam = new Yam('test');

    assert.ok(yam.get);
    assert.ok(yam.set);
    assert.ok(yam.clear);
    assert.ok(yam.remove);
    assert.ok(yam.storageExists);
    assert.ok(yam.forceSet);
    assert.ok(yam.forceClear);
    assert.ok(yam.forceRemove);
  });

  it('private API methods exist', function() {
    yam = new Yam('test');

    assert.ok(yam._isLazy);
    assert.ok(yam._internalOptions);
  });

  describe('storageExists', function() {
    var path = '.settings';

    beforeEach(function() {
      yam = new Yam('test', path, {
        foo: 'bar'
      });
    });

    it('should return true if storage file exists', function() {
      assert.ok(yam.storageExists());
      fs.unlinkSync(path);
    });

    it('should return false if storage file doesn\'t exists', function() {
      fs.unlinkSync(path);
      assert.notOk(yam.storageExists());
    });
  });

  describe('get', function() {
    var path = '.settings';

    afterEach(function() {
      fs.unlinkSync(path);
    });

    it('should return the value of the specified key', function() {
      yam = new Yam('test', path, { foo: 'bar' });
      assert.equal(yam.get('foo'), 'bar');
    });

    it('should return `null` as a value for non-existing key', function() {
      yam = new Yam('test', path);
      yam.get('foo', 'bar');
      assert.equal(yam.get('foo'), null);
    });
  });

  describe('set', function() {
    var path = '.settings';

    afterEach(function() {
      fs.unlinkSync(path);
    });

    it('should create and set the value for an non-existing key', function() {
      yam = new Yam('test', path);

      yam.set('foo', 'bar');
      assert.equal(yam.get('foo'), 'bar');
    });

    it('should set the value for an existing key', function() {
      yam = new Yam('test', path, { foo: 'bar' });

      assert.equal(yam.get('foo'), 'bar');
      yam.set('foo', 'baz');
      assert.equal(yam.get('foo'), 'baz');
    });
  });

  describe('clear', function() {
    var path = '.settings';

    afterEach(function() {
      fs.unlinkSync(path);
    });

    it('should clear all the values upon `clear` call', function() {
      yam = new Yam('test', path, { foo: 'bar' });

      assert.equal(yam.get('foo'), 'bar');
      yam.clear();
      assert.equal(yam.get('foo'), null);

      assert.equal(fs.readFileSync(path), '{}');
    });
  });

  describe('remove', function() {
    var path = '.settings';

    afterEach(function() {
      fs.unlinkSync(path);
    });

    it('shouldn\'t throw exception upon deletion of an non-existing key', function() {
      yam = new Yam('test', path);

      assert.throws(function() {
        yam.remove('foo');
      }, '`foo` doesn\'t exist.');
    });

    it('should delete the specified key upon `remove` call', function() {
      yam = new Yam('test', path, { foo: 'bar' });
      yam.remove('foo');
      assert.equal(yam.get('foo'), null);
    });
  });

  describe('constructor', function() {
    var path = '.test';

    afterEach(function() {
      if (fs.existsSync(path)) {
        fs.unlinkSync(path);
      }
    });

    it('should use an existing config file if it exist', function() {
      fs.openSync(path, 'w');
      yam = new Yam('test', path);
      assert.equal(yam.path, path);
    });

    it('should throw an exception if `id` is not specified', function() {
      assert.throws(function() {
        yam = new Yam();
      }, 'You must specify an id.');
    });

    it('should create a default storage file if `path` wasn\'t specified', function() {
      yam = new Yam('test');
      assert.ok(fs.existsSync(path));
    });

    it('should create a config file and populate it with `options`', function() {
      yam = new Yam('test', path, { foo: 'bar' });

      assert.ok(fs.existsSync(path));
      assert.equal(yam.get('foo'), 'bar');
    });

    it('should create a config file if it doesn\'t exist', function() {
      yam = new Yam('test', path, {});
      assert.ok(fs.existsSync(path));
    });
  });
});
