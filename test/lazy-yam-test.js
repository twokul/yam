'use strict';

var assert  = require('chai').assert,
    LazyYam = require('../lib/yam').LazyYam,
    fs      = require('fs'),
    lazyYam;

describe('LazyYam', function() {
  it('exists', function() {
    assert.ok(LazyYam);
  });

  it('public API methods exist', function() {
    lazyYam = new LazyYam('test');

    assert.ok(lazyYam.get);
    assert.ok(lazyYam.set);
    assert.ok(lazyYam.clear);
    assert.ok(lazyYam.remove);
  });

  it('link connects to another storage file', function() {
    var path = '.settings';

    lazyYam = new LazyYam('test', '', {
      foo: 'bar'
    });

    lazyYam.link(path);

    assert.equal(lazyYam.get('foo'), 'bar');

    fs.unlinkSync(path);
  });
});
