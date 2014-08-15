'use strict';

var assert = require('chai').assert;
var Yam    = require('../lib/yam');
var yam;

var ok        = assert.ok;
var deepEqual = assert.deepEqual;

describe('Yam', function() {
  it('exists', function() {
    ok(Yam);
  });

  describe('constructor', function() {
    it('sets default options properly', function() {
      yam = new Yam('test');

      deepEqual(yam.options, {});
    });

    it('sets options properly', function() {
      yam = new Yam('test', {
        primary:   'test/fixtures/primary/',
        secondary: 'test/fixtures/secondary/'
      });

      deepEqual(yam.options, {
        foo: 'bar',
        baz: 5
      });
    });
  });
});
