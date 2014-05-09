'use strict';

var assert = require('chai').assert,
    Yam    = require('../lib/yam').Yam,
    yam;

describe('Yam', function() {
  it('exists', function() {
    assert.ok(Yam);
  });

  it('public API methods exist', function() {
    yam = new Yam('test');

    assert.ok(yam.get);
    assert.ok(yam.set);
    assert.ok(yam.clear);
    assert.ok(yam.remove);
    assert.ok(yam.storageExists);
  });

  it('private API methods exist', function() {
    yam = new Yam('test');

    assert.ok(yam._isLazy);
    assert.ok(yam._internalOptions);
  });
});
