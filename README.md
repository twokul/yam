yam
====

[![Build Status](https://travis-ci.org/twokul/yam.svg)](https://travis-ci.org/twokul/yam)

Dead simple lazy storage interface

#### Yam Constructor

```javascript
var yam = new Yam('test', '.test-settings');
```

```javascript
var yam = new Yam('test', '.test-settings', {
  foo: 'bar'
});
```

#### Get

```javascript
yam.get('foo'); // => 'bar'
```

#### Set

```javascript
yam.set('foo', 'baz');
yam.get('foo'); // => 'baz'
```

#### Remove

```javascript
yam.remove('foo');
yam.get('foo'); // => null
```

#### Clear

```javascript
yam.clear();
```

#### LazyYam Constructor

```javascript
var lazyYam = new LazyYam('test', '.test-settings');
```

```javascript
var lazyYam = new LazyYam('test', '.test-settings', {
  foo: 'bar'
});
```
