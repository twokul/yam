'use strict';

var assert = require('chai').assert,
    Yam    = require('../lib/yam').Yam,
    fs     = require('fs'),
    yam;

describe('Yam', function() {
  describe('._isLazy()', function() {
    var packageName = 'test',
        path        = '.' + packageName;

    it('returns true be default', function() {
      yam = new Yam('test');
      assert.ok(yam._isLazy());
    });

    it('returns false if force option is specified', function() {
      yam = new Yam('test', {
        force: true
      });

      assert.notOk(yam._isLazy());
      fs.unlinkSync(path);
    });
  });
});
