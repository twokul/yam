'use strict';

var assert = require('chai').assert,
    Yam    = require('../lib/yam').Yam,
    fs     = require('fs'),
    yam;

describe('Yam', function() {
  var path = '.test';

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
  });

  it('private API methods exist', function() {
    yam = new Yam('test');

    assert.ok(yam._isLazy);
    assert.ok(yam._internalOptions);
  });

  describe('with `force` option', function() {
    describe('.storageExists()', function() {
      beforeEach(function() {
        yam = new Yam('test', {
          force: true,
          options: {
            foo: 'bar'
          }
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

    describe('.get()', function() {
      beforeEach(function() {
        yam = new Yam('test', {
          force: true,
          options: {
            foo: 'bar'
          }
        });
      });

      afterEach(function() {
        fs.unlinkSync(path);
      });

      it('should return the value of the specified key', function() {
        yam = new Yam('test', {
          force: true,
          options: {
            foo: 'bar'
          }
        });
        assert.equal(yam.get('foo'), 'bar');
      });

      it('should return `null` as a value for non-existing key', function() {
        yam = new Yam('test', path);
        yam.get('foo', 'bar');
        assert.equal(yam.get('foo'), null);
      });
    });

    describe('.set()', function() {
      afterEach(function() {
        fs.unlinkSync(path);
      });

      it('should create and set the value for an non-existing key', function() {
        yam = new Yam('test', {
          force: true
        });

        yam.set('foo', 'bar');
        assert.equal(yam.get('foo'), 'bar');
      });

      it('should set the value for an existing key', function() {
        yam = new Yam('test', {
          force: true,
          options: {
            foo: 'bar'
          }
        });

        assert.equal(yam.get('foo'), 'bar');
        yam.set('foo', 'baz');
        assert.equal(yam.get('foo'), 'baz');
      });
    });

    describe('.clear()', function() {
      afterEach(function() {
        fs.unlinkSync(path);
      });

      it('should clear all the values upon `clear` call', function() {
        yam = new Yam('test', {
          force: true,
          options: {
            foo: 'bar'
          }
        });

        assert.equal(yam.get('foo'), 'bar');
        yam.clear();
        assert.equal(yam.get('foo'), null);

        assert.equal(fs.readFileSync(path), '{}');
      });
    });

    describe('remove', function() {
      afterEach(function() {
        fs.unlinkSync(path);
      });

      it('shouldn\'t throw exception upon deletion of an non-existing key', function() {
        yam = new Yam('test', {
          force: true
        });

        assert.throws(function() {
          yam.remove('foo');
        }, '`foo` doesn\'t exist.');
      });

      it('should delete the specified key upon `remove` call', function() {
        yam = new Yam('test', {
          force: true,
          options: {
            foo: 'bar'
          }
        });
        yam.remove('foo');
        assert.equal(yam.get('foo'), null);
      });
    });
  });
});
