/* global QUnit */
import Em from 'ember';
import ArraySlice from 'array-slice';

QUnit.module('ArraySlice');

QUnit.test('constructor exists', function (assert) {
	assert.ok(ArraySlice, 'ArraySlice is not null or undefined');
	assert.equal(typeof ArraySlice, 'function', 'ArraySlice is function');
});

QUnit.test('content is initialized', function (assert) {
	var arr = Em.A(['a', 'b', 'c']);
	var slice = ArraySlice.create({
		content: arr
	});
	assert.equal(slice.get('arrangedContent.length'), 3);
	assert.equal(slice.get('content.length'), 3);
	assert.equal(slice.get('length'), 3);
	assert.deepEqual(slice.toArray(), ['a', 'b', 'c']);
});

QUnit.test('offset defaults to zero', function (assert) {
	var slice = ArraySlice.create({
		content: Em.A(['a', 'b', 'c'])
	});
	assert.equal(slice.get('offset'), 0);
});

QUnit.test('offset can be initialized', function (assert) {
	var slice = ArraySlice.create({
		content: Em.A(['a', 'b', 'c']),
		offset: 2
	});
	assert.equal(slice.get('offset'), 2);
});

QUnit.test('arranged content matches original content', function (assert) {
	var slice = ArraySlice.create({
		content: Em.A(['a', 'b', 'c']),
		offset: 2
	});
	assert.equal(slice.objectAt(0), 'c');
});

QUnit.test('arranged content length does not exceed limit', function (assert) {
	var slice = ArraySlice.create({
		content: Em.A(['a', 'b', 'c']),
		limit: 2
	});
	assert.equal(slice.get('length'), 2);
});

QUnit.test('offset can be updated', function (assert) {
	var slice = ArraySlice.create({
		content: Em.A(['a', 'b', 'c'])
	});
	assert.equal(slice.objectAt(0), 'a');
	assert.equal(slice.get('length'), 3);
	slice.set('offset', 1);
	assert.equal(slice.objectAt(0), 'b');
	assert.equal(slice.get('length'), 2);
	slice.set('offset', 2);
	assert.equal(slice.objectAt(0), 'c');
	assert.equal(slice.get('length'), 1);
});

QUnit.test('content array unshift', function (assert) {
	var arr = Em.A(['a', 'b', 'c']);
	var slice = ArraySlice.create({
		content: arr,
		offset: 1
	});
	assert.equal(slice.objectAt(0), 'b');
	arr.unshiftObject('x');
	assert.equal(slice.objectAt(0), 'a');
});
