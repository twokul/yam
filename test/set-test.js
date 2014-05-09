'use strict';

var assert = require('chai').assert,
    Yam    = require('../lib/yam'),
    fs     = require('fs'),
    yam;

describe('set()', function() {
  var path = '.test';

  describe('no `force` option', function() {
    it('should create and set the value for an non-existing key', function() {
      yam = new Yam('test');

      yam.set('foo', 'bar');
      assert.equal(yam.get('foo'), 'bar');
    });

    it('should set the value for an existing key', function() {
      yam = new Yam('test', {
        options: {
          foo: 'bar'
        }
      });

      assert.equal(yam.get('foo'), 'bar');
      yam.set('foo', 'baz');
      assert.equal(yam.get('foo'), 'baz');
    });
  });

  describe('with `force` option', function() {
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
});
