'use strict';

var assert = require('chai').assert,
    Yam    = require('../lib/yam'),
    yam;

describe('Yam', function() {
  it('exists', function() {
    assert.ok(Yam);
  });

  it('public API methods exist', function() {
    yam = new Yam('test');

    assert.ok(yam.get,           'get does not exist');
    assert.ok(yam.set,           'set does not exist');
    assert.ok(yam.clear,         'clear does not exist');
    assert.ok(yam.remove,        'remove does not exist');
    assert.ok(yam.storageExists, 'storage does not exist');
    assert.ok(yam.flush,         'flush does not exist');
  });

  it('private API methods exist', function() {
    yam = new Yam('test');

    assert.ok(yam._isLazy);
    assert.ok(yam._internalOptions);
  });
});
