'use strict';

var assert         = require('chai').assert,
    Yam            = require('../lib/yam'),
    deleteIfExists = require('../lib/utils/config-file-utils').deleteIfExists,
    yam;

describe('get()', function() {
  var path = '.test';

  describe('no `force` option', function() {
    beforeEach(function() {
      yam = new Yam('test', {
        options: {
          foo: 'bar'
        }
      });
    });

    it('should return all options as a hash', function() {
      assert.deepEqual(yam.getAll(), {
        foo: 'bar'
      });
    });

    it('should return the value of the specified key', function() {
      assert.equal(yam.get('foo'), 'bar');
    });

    it('should return `null` as a value for non-existing key', function() {
      yam = new Yam('test', path);
      yam.get('foo', 'bar');
      assert.equal(yam.get('foo'), null);
    });
  });

  describe('with `force` option', function() {
    beforeEach(function() {
      yam = new Yam('test', {
        force: true,
        options: {
          foo: 'bar'
        }
      });
    });

    afterEach(function() {
      deleteIfExists(path);
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
      yam = new Yam('test');
      yam.get('blammo');
      assert.equal(yam.get('blammo'), null);
    });
  });
});
