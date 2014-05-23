'use strict';

var assert         = require('chai').assert,
    Yam            = require('../lib/yam'),
    deleteIfExists = require('../lib/utils/config-file-utils').deleteIfExists,
    read           = require('../lib/utils/config-file-utils').read,
    yam;

describe('clear()', function() {
  var path = '.test';

  describe('with `force` option', function() {
    afterEach(function() {
      deleteIfExists(path);
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

      assert.deepEqual(read(path), {});
    });
  });
});
