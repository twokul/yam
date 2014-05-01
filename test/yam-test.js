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

  it('should return the value of the specified key', function() {
    assert.ok(false);
  });

  it('should return `null` as a value for non-existing key', function() {
    assert.ok(false);
  });

  it('should create and set the value for an non-existing key', function() {
    assert.ok(false);
  });

  it('should set the value for an existing key', function() {
    assert.ok(false);
  });

  it('should clear all the values upon `clear` call', function() {
    assert.ok(false);
  });

  it('shouldn\'t throw exception upon deletion of an non-existing key', function() {
    assert.ok(false);
  });

  it('should delete the specified key upon `delete` call', function() {
    assert.ok(false);
  });

  it('should use an existing config file if it exist', function() {
    assert.ok(false);
  });

  it('should create a config file if it doesn\'t exist', function() {
    assert.ok(false);
  });
});
