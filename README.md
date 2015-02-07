# ember-cli-array-slice

[![master branch build status](https://travis-ci.org/j-/ember-cli-array-slice.svg?branch=master)](https://travis-ci.org/j-/ember-cli-array-slice)

Ember CLI array slice addon.

`ember-cli-array-slice` exposes an [Ember][ember] [ArrayProxy][proxy] subclass which proxies a slice
of a given content array. Its values will update when the original array is modified.

## Example

```js
import ArraySlice from 'array-slice';

var sliced = ArraySlice.create({
	content: [3, 1, 4, 1, 5, 9],
	offset: 2,
	limit: 3
});

console.log(sliced.toArray()); // [4, 1, 5];
```

## Properties

**`content`**: Ember.Array (optional, default = `[]`)

The content array. Must be an object that implements `Ember.Array` and/or `Ember.MutableArray`.
See [`Ember.ArrayProxy#content`][content].

**`offset`**: Number (optional, default = `0`)

Index where slice begins.

**`limit`**: Number (optional, default = `Infinity`)

Maximum number of elements to hold in the array. By default, holds all elements after `offset`.

## Installing

With [npm][npm]:

```sh
$ npm install --save ember-cli-array-slice
```

Or with [Ember CLI][cli]:

```sh
$ ember install:npm ember-cli-array-slice
```

## License

[MIT license](LICENSE.md).

[ember]: http://emberjs.com/
[proxy]: http://emberjs.com/api/classes/Ember.ArrayProxy.html
[content]: http://emberjs.com/api/classes/Ember.ArrayProxy.html#property_content
[npm]: https://www.npmjs.com/
[cli]: http://www.ember-cli.com/
