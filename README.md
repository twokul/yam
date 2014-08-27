yam
====

[![Build Status](https://travis-ci.org/twokul/yam.svg)](https://travis-ci.org/twokul/yam)

Dead simple lazy storage interface.

Yam is lazy by default. "Lazy" means that it never tries to persist settings unless you ask it to.

#### Yam Constructor

```javascript
var yam = new Yam('test');

var yam = new Yam('test', {
  primary: 'path/to/primary/location',
  secondary: 'path/to/secondary/location'
});
```

#### Get

```javascript
yam.get('foo'); // => 'bar'
```
#### GetAll

```javascript
yam.getAll();
```
