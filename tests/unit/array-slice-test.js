import Em from 'ember';
import { test } from 'ember-qunit';
import ArraySlice from 'array-slice';

test('constructor exists', function () {
	ok(ArraySlice, 'ArraySlice is not null or undefined');
	equal(typeof ArraySlice, 'function', 'ArraySlice is function');
});

test('content is initialized', function () {
	var arr = ['a', 'b', 'c'];
	var slice = ArraySlice.create({
		content: arr
	});
	equal(slice.get('arrangedContent.length'), 3);
	equal(slice.get('content.length'), 3);
	equal(slice.get('length'), 3);
	equal(slice.get('arrangedContent').join(''), 'abc');
});

test('offset defaults to zero', function () {
	var slice = ArraySlice.create({
		content: ['a', 'b', 'c']
	});
	equal(slice.get('offset'), 0);
});

test('offset can be initialized', function () {
	var slice = ArraySlice.create({
		content: ['a', 'b', 'c'],
		offset: 2
	});
	equal(slice.get('offset'), 2);
});

test('arranged content matches original content', function () {
	var slice = ArraySlice.create({
		content: ['a', 'b', 'c'],
		offset: 2
	});
	equal(slice.objectAt(0), 'c');
});

test('arranged content length does not exceed limit', function () {
	var slice = ArraySlice.create({
		content: ['a', 'b', 'c'],
		limit: 2
	});
	equal(slice.get('length'), 2);
});

test('offset can be updated', function () {
	var slice = ArraySlice.create({
		content: ['a', 'b', 'c']
	});
	equal(slice.objectAt(0), 'a');
	equal(slice.get('length'), 3);
	slice.set('offset', 1);
	equal(slice.objectAt(0), 'b');
	equal(slice.get('length'), 2);
	slice.set('offset', 2);
	equal(slice.objectAt(0), 'c');
	equal(slice.get('length'), 1);
});

test('content array unshift', function () {
	var arr = ['a', 'b', 'c'];
	var slice = ArraySlice.create({
		content: arr,
		offset: 1
	});
	equal(slice.objectAt(0), 'b');
	arr.unshiftObject('x');
	equal(slice.objectAt(0), 'a');
});
