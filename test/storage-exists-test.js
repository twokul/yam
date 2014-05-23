'use strict';

var assert         = require('chai').assert,
    Yam            = require('../lib/yam'),
    deleteIfExists = require('../lib/utils/config-file-utils').deleteIfExists,
    yam;

describe('storageExists()', function() {
  describe('no `force` option', function() {
    beforeEach(function() {
      yam = new Yam('test', {
        options: {
          foo: 'bar'
        }
      });
    });

    it('should return true if storage file exists', function() {
      assert.ok(yam.storageExists());
    });
  });

  describe('with `force` option', function() {
    var path = '.test';

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
      deleteIfExists(path);
    });

    it('should return false if storage file doesn\'t exists', function() {
      deleteIfExists(path);
      assert.notOk(yam.storageExists());
    });
  });
});
