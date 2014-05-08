yam
====

[![Build Status](https://travis-ci.org/twokul/yam.svg)](https://travis-ci.org/twokul/yam)

Dead simple lazy storage interface

#### Yam Constructor

```javascript
var yam = new Yam('test');
```

```javascript
var yam = new Yam('test', {
  force: true,
  options: {
    foo: 'bar'
  }
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

#### Lazy Yam Constructor

```javascript
var lazyYam = new Yam('test');
```

```javascript
var lazyYam = new Yam('test', {
  foo: 'bar'
});
```
