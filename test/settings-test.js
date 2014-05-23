'use strict';

var assert         = require('chai').assert,
    Yam            = require('../lib/yam'),
    deleteIfExists = require('../lib/utils/config-file-utils').deleteIfExists,
    yam;

describe('Settings', function() {
  var path = '.test';

  beforeEach(function() {
    yam = new Yam('test', {
      options: {
        foo: 'bar'
      }
    });
  });

  afterEach(function() {
    deleteIfExists(path);
  });

  it('blah', function() {
    assert.ok(true);
  });
});
