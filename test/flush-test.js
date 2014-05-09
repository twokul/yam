'use strict';

var assert = require('chai').assert,
    Yam    = require('../lib/yam').Yam,
    fs     = require('fs-extra'),
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
    if (fs.existsSync(path)) {
      fs.unlinkSync(path);
    }
  });

  describe('should save options to the file system', function() {
    it('if storage file exists', function() {
      yam.flush();
      assert.ok(fs.existsSync(path));
      assert.deepEqual(fs.readJsonSync(path), {
        foo: 'bar'
      });
      yam.set('bar', 'baz');
      yam.flush();
      assert.deepEqual(fs.readJsonSync(path), {
        foo: 'bar',
        bar: 'baz'
      });
    });

    it('if storage file doesn\'t exist', function() {
      yam.flush();
      assert.ok(fs.existsSync(path));
      assert.deepEqual(fs.readJsonSync(path), {
        foo: 'bar'
      });
    });
  });
});
