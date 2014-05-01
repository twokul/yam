'use strict';

var assert = require('chai').assert,
    Yam    = require('../lib/yam'),
    yam;

describe('Yam tests', function() {
  it('Yam exists', function() {
    assert.ok(Yam);
  });

  it('public API methods exist', function() {
    yam = new Yam();
    assert.ok(yam.get);
    assert.ok(yam.set);
    assert.ok(yam.clear);
    assert.ok(yam.remove);
  });
});
