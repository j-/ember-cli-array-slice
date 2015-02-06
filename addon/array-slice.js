import Em from 'ember';
var get = Em.get;
var set = Em.set;

var DEFAULT_OFFSET = 0;
var DEFAULT_LIMIT = Infinity;

var ArraySlice = Em.ArrayProxy.extend({
	offset: function (key, offset, old) {
		// getter
		if (arguments.length <= 1) {
			// default value
			return DEFAULT_OFFSET;
		}
		// do not allow negative offset
		offset = Math.max(offset, 0);
		// setter
		var diff = offset - old || 0;
		// no work to do
		if (diff === 0) {
			return offset;
		}
		var content = get(this, 'content');
		var limit = get(this, 'limit');
		var arranged = get(this, 'arrangedContent');
		var arrangedLength = get(arranged, 'length');
		diff = Math.min(diff, limit);
		// unshift
		arranged.replace(
			// beginning of array
			0,
			// remove count
			Math.min(diff, arrangedLength),
			// items to add
			content.slice(offset, offset - diff)
		);
		// pop
		var index = Math.min(limit, arrangedLength - diff);
		index = Math.max(index, 0);
		arranged.replace(
			// end of array
			index,
			// remove count
			get(arranged, 'length') - index,
			// items to add
			content.slice(offset + limit - diff, offset + limit)
		);
		return offset;
	}.property(),

	limit: function (key, limit, old) {
		// getter
		if (arguments.length <= 1) {
			// default value
			return DEFAULT_LIMIT;
		}
		// do not allow negative limit
		limit = Math.max(limit, 0);
		// setter
		var offset = get(this, 'offset');
		var content = get(this, 'content');
		var arrangedContent = get(this, 'arrangedContent');
		var arrangedLength = get(arrangedContent, 'length');
		var diff = limit - arrangedLength;
		var index = arrangedLength + offset;
		var addedItems = content.slice(index, index + Math.max(diff, 0));
		diff = Math.max(-diff, 0);
		arrangedContent.replace(arrangedLength - diff, diff, addedItems);
		return limit;
	}.property(),

	arrangedContent: function () {
		var content = get(this, 'content');
		var offset = get(this, 'offset');
		var limit = get(this, 'limit');
		var slice = content.slice(offset, offset + limit);
		return slice;
	}.property('content'),

	contentArrayDidChange: function (content, i, removedCount, addedCount) {
		var offset = get(this, 'offset');
		var limit = get(this, 'limit');
		var output = get(this, 'arrangedContent');
		var length = get(output, 'length');
		var addedItems = content.slice(offset, offset + addedCount);
		output.replace(length - i - addedCount, addedCount);
		output.replace(0, 0, addedItems);
	}
});

ArraySlice.computed = {
	slice: function (prop, offset, limit) {
		return function () {
			return ArraySlice.create({
				content: this.get(prop),
				offset: offset,
				limit: limit
			});
		}.property(prop);
	}
};

export default ArraySlice;
