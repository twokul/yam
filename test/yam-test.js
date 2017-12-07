'use strict';

var path   = require('path');
var assert = require('chai').assert;
var Yam    = require('../lib/yam');
var yam;

var ok        = assert.ok;
var deepEqual = assert.deepEqual;
var equal     = assert.equal;

describe('Yam', function() {
  it('exists', function() {
    ok(Yam);
  });

  describe('get', function() {
    it('returns value', function() {
      yam = new Yam('test', {
        primary:   'test/fixtures/primary/',
        secondary: 'test/fixtures/secondary/'
      });

      equal(yam.get('foo'), 'bar');
      equal(yam.get('baz'), 5);
    });

    it('supports Javascript files', function() {
      yam = new Yam('js-test', {
        primary:   path.join(process.cwd(), 'test/fixtures/primary/'),
        secondary: path.join(process.cwd(), 'test/fixtures/secondary/')
      });

      equal(yam.get('foo'), 'bar');
      equal(yam.get('baz'), 5);
    });

    it('returns `undefined` if the value was not found', function() {
      yam = new Yam('foobar', {
        primary:   'test/fixtures/primary/',
        secondary: 'test/fixtures/secondary/'
      });

      equal(yam.get('durp'), undefined);
    });

    it('returns `false` if the value is false', function() {
      yam = new Yam('test', {
        primary:   'test/fixtures/primary/',
        secondary: 'test/fixtures/secondary/'
      });

      equal(yam.get('falsey'), false);
    });
  });

  describe('constructor', function() {
    it('sets default options properly', function() {
      yam = new Yam('foobar');

      deepEqual(yam.options, {});
    });

    it('sets options properly', function() {
      yam = new Yam('test', {
        primary:   'test/fixtures/primary/',
        secondary: 'test/fixtures/secondary/'
      });

      deepEqual(yam.options, {
        foo: 'bar',
        baz: 5,
        falsey: false
      });
    });
  });
});
