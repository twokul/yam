'use strict';

var assert         = require('chai').assert,
    Yam            = require('../lib/yam'),
    deleteIfExists = require('../lib/utils/config-file-utils').deleteIfExists,
    exists         = require('../lib/utils/config-file-utils').exists,
    open           = require('../lib/utils/config-file-utils').open,
    write          = require('../lib/utils/config-file-utils').write,
    getUserHome    = require('../lib/utils/config-file-utils').getUserHome,
    yam;

describe('Constructor', function() {
  var path     = '.test',
      homePath = getUserHome() + '/' + path;

  afterEach(function() {
    deleteIfExists(path);
  });

  it('should create an instance', function() {
    yam = new Yam('test', {
      options: {
        foo: 'bar'
      }
    });
    assert.ok(yam, 'instance exists');
  });

  it('shouldn\'t create a config file by default', function() {
    yam = new Yam('test');
    assert.ok(!exists(path));
  });

  it('should use the homePath specified', function() {
    yam = new Yam('test', {
      homePath: 'some-random-path'
    });

    assert.equal(yam.homePath, 'some-random-path/.test');
  });

  it('should use the path specified', function() {
    yam = new Yam('test', {
      path: 'some-random-path'
    });

    assert.equal(yam.path, 'some-random-path/.test');
  });

  describe('no `force` option', function() {
    it('creates cache', function() {
      yam = new Yam('test');
      assert.ok(!exists(path));
      assert.ok(yam._cache);
    });

    it('should initialize cache with options from home and location settings file', function() {
      write(path, {
        bar: 'baz'
      });
      write(homePath, {
        see: 'you'
      });

      yam = new Yam('test', {
        options: {
          foo: 'bar'
        }
      });

      assert.ok(exists(path));
      assert.ok(exists(homePath));

      assert.equal(yam.get('foo'), 'bar');
      assert.equal(yam.get('bar'), 'baz');
      assert.equal(yam.get('see'), 'you');

      deleteIfExists(path);
      deleteIfExists(homePath);
    });

    it('should set the values in the cache', function() {
      open(path);

      yam = new Yam('test', {
        options: {
          foo: 'bar'
        }
      });

      assert.equal(yam.path, path);
      assert.equal(yam.get('foo'), 'bar');
    });
  });

  describe('with `force` option', function() {
    it('should create a config file with a custom name', function() {
      yam = new Yam('foo-bar', {
        force: true
      });
      assert.ok(exists('.foo-bar'));
      deleteIfExists('.foo-bar');
    });

    it('should create a config file if it doesn\'t exist', function() {
      yam = new Yam('test', {
        force: true
      });
      assert.ok(exists(path));
    });

    it('should use an existing config file if it exist', function() {
      open(path);
      yam = new Yam('test', {
        force: true,
        options: {
          foo: 'bar'
        }
      });
      assert.equal(yam.path, path);
      assert.equal(yam.get('foo'), 'bar');
    });

    it('should throw an exception if `id` is not specified', function() {
      assert.throws(function() {
        yam = new Yam();
      }, 'You must specify an id.');
    });

    it('should create a default storage file if `path` wasn\'t specified', function() {
      yam = new Yam('test', {
        force: true
      });
      assert.ok(exists(path));
    });

    it('should create a config file and populate it with `options`', function() {
      yam = new Yam('test', {
        force: true,
        options: {
          foo: 'bar'
        }
      });

      assert.ok(exists(path));
      assert.equal(yam.get('foo'), 'bar');
    });
  });
});
