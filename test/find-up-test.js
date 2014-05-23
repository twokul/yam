'use strict';

var assert         = require('chai').assert,
    p              = require('path'),
    Yam            = require('../lib/yam'),
    deleteIfExists = require('../lib/utils/config-file-utils').deleteIfExists,
    write          = require('../lib/utils/config-file-utils').write,
    getUserHome    = require('../lib/utils/config-file-utils').getUserHome,
    yam;

describe('find up', function() {
  var path     = '.test',
      homePath = p.normalize(getUserHome() + '/' + path),
      options  = { foo: 'bar' };

  beforeEach(function() {
    write(homePath, options);

    yam = new Yam('test', {
      options: {
        bar: 'baz'
      }
    });
  });

  afterEach(function() {
    deleteIfExists(homePath);
  });

  it('should use config file in the home directory and the current directory', function() {
    assert.equal(yam.get('bar'), 'baz', 'gets correct value');
    assert.equal(yam.get('foo'), 'bar', 'gets correct value');
  });

  it('should use config file in home directory if config file doesn\'t exist in the current directory', function() {
    assert.equal(yam.get('bar'), 'baz', 'gets correct value');
  });
});
