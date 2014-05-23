'use strict';

var assert         = require('chai').assert,
    Yam            = require('../lib/yam'),
    deleteIfExists = require('../lib/utils/config-file-utils').deleteIfExists,
    yam;

describe('remove()', function() {
  var path = '.test';

  describe('no `force` option', function() {
    it('shouldn\'t throw exception upon deletion of an non-existing key', function() {
      yam = new Yam('test');

      assert.throws(function() {
        yam.remove('foo');
      }, '`foo` doesn\'t exist.');
    });

    it('should delete the specified key upon `remove` call', function() {
      yam = new Yam('test', {
        options: {
          foo: 'bar'
        }
      });
      yam.remove('foo');
      assert.equal(yam.get('foo'), null);
    });
  });

  describe('with `force` option', function() {
    afterEach(function() {
      deleteIfExists(path);
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
