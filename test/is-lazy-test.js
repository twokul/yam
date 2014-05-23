'use strict';

var assert         = require('chai').assert,
    Yam            = require('../lib/yam'),
    deleteIfExists = require('../lib/utils/config-file-utils').deleteIfExists,
    yam;

describe('_isLazy()', function() {
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
    deleteIfExists(path);
  });
});
