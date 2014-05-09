'use strict';

var assert = require('chai').assert,
    Yam    = require('../lib/yam'),
    fs     = require('fs'),
    yam;

describe('clear()', function() {
  var path = '.test';

  describe('with `force` option', function() {
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
});
