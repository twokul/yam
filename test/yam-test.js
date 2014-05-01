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
  });

  describe('get', function() {
    it('should return the value of the specified key', function() {
      var path = '.settings';

      yam = new Yam('test', path, {
        foo: 'bar'
      });

      assert.equal(yam.get('foo'), 'bar');

      fs.unlinkSync(path);
    });

    it('should return `null` as a value for non-existing key', function() {
      var path = '.settings';

      yam = new Yam('test', path);

      yam.get('foo', 'bar');
      assert.equal(yam.get('foo'), null);

      fs.unlinkSync(path);
    });
  });

  describe('set', function() {
    it('should create and set the value for an non-existing key', function() {
      var path = '.settings';

      yam = new Yam('test', path);

      yam.set('foo', 'bar');
      assert.equal(yam.get('foo'), 'bar');

      fs.unlinkSync(path);
    });

    it('should set the value for an existing key', function() {
      var path = '.settings';

      yam = new Yam('test', path, {
        foo: 'bar'
      });

      assert.equal(yam.get('foo'), 'bar');
      yam.set('foo', 'baz');
      assert.equal(yam.get('foo'), 'baz');

      fs.unlinkSync(path);
    });
  });

  describe('clear', function() {
    it('should clear all the values upon `clear` call', function() {
      var path = '.settings';

      yam = new Yam('test', path, {
        foo: 'bar'
      });

      assert.equal(yam.get('foo'), 'bar');
      yam.clear();
      assert.equal(yam.get('foo'), null);

      assert.equal(fs.readFileSync(path), '{}');

      fs.unlinkSync(path);
    });
  });

  describe('remove', function() {
    it('shouldn\'t throw exception upon deletion of an non-existing key', function() {
      var path = '.settings';

      yam = new Yam('test', path);

      assert.throws(function() {
        yam.remove('foo');
      }, '`foo` doesn\'t exist.');

      fs.unlinkSync(path);
    });

    it('should delete the specified key upon `remove` call', function() {
      var path = '.settings';

      yam = new Yam('test', path, {
        foo: 'bar'
      });

      yam.remove('foo');
      assert.equal(yam.get('foo'), null);

      fs.unlinkSync(path);
    });
  });

  describe('constructor', function() {
    it('should use an existing config file if it exist', function() {
      var path = '.settings2';

      fs.openSync(path, 'w');

      yam = new Yam('test', path);

      assert.equal(yam.path, path);

      fs.unlinkSync(path);
    });

    it('should throw an exception if `id` is not specified', function() {
      assert.throws(function() {
        yam = new Yam();
      }, 'You must specify an id.');
    });

    it('should create a default storage file if `path` wasn\'t specified', function() {
      var path = '.settings';

      yam = new Yam('test');

      assert.ok(fs.existsSync(path));

      fs.unlinkSync(path);
    });

    it('should create a config file and populate it with `options`', function() {
      var path = '.test';

      yam = new Yam('test', path, {
        foo: 'bar'
      });

      assert.ok(fs.existsSync(path));
      assert.equal(yam.get('foo'), 'bar');

      fs.unlinkSync(path);
    });

    it('should create a config file if it doesn\'t exist', function() {
      var path = '.test';

      yam = new Yam('test', path, {});

      assert.ok(fs.existsSync(path));

      fs.unlinkSync(path);
    });
  });
});
