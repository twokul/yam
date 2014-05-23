'use strict';

var assert         = require('chai').assert,
    Yam            = require('../lib/yam'),
    deleteIfExists = require('../lib/utils/config-file-utils').deleteIfExists,
    read           = require('../lib/utils/config-file-utils').read,
    exists         = require('../lib/utils/config-file-utils').exists,
    yam;

describe('flush()', function() {
  var path = '.test';

  beforeEach(function() {
    yam = new Yam('test', {
      options: {
        foo: 'bar'
      }
    });
  });

  afterEach(function() {
    deleteIfExists(path);
  });

  describe('should save options to the file system', function() {
    it('if storage file exists', function() {
      yam.flush();
      assert.ok(exists(path));
      assert.deepEqual(read(path), {
        foo: 'bar'
      });
      yam.set('bar', 'baz');
      yam.flush();
      assert.deepEqual(read(path), {
        foo: 'bar',
        bar: 'baz'
      });
    });

    it('if storage file doesn\'t exist', function() {
      yam.flush();
      assert.ok(exists(path));
      assert.deepEqual(read(path), {
        foo: 'bar'
      });
    });
  });
});
