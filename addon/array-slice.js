import Em from 'ember';
import ArrayLimit from 'array-limit';
import ArrayOffset from 'array-offset';

var computed = Em.computed;
var alias = computed.alias;

var DEFAULT_OFFSET = 0;
var DEFAULT_LIMIT = Infinity;

var ArraySlice = Em.ArrayProxy.extend({
	offset: computed(function (key, offset) {
		if (arguments.length <= 1) {
			return DEFAULT_OFFSET;
		}
		this.set('_offsetProxy.offset', offset);
		return this.get('_offsetProxy.offset');
	}),

	limit: computed(function (key, limit) {
		if (arguments.length <= 1) {
			return DEFAULT_LIMIT;
		}
		this.set('_limitProxy.limit', limit);
		return this.get('_limitProxy.limit');
	}),

	content: computed(function (key, content) {
		if (arguments.length <= 1) {
			return Em.A();
		}
		this.set('_offsetProxy.content', content);
		return this.get('_offsetProxy.content');
	}),

	_offsetProxy: computed(function () {
		return ArrayOffset.create({
			content: this.get('content'),
			offset: this.get('offset')
		});
	}),

	_limitProxy: computed(function () {
		return ArrayLimit.create({
			content: this.get('_offsetProxy.arrangedContent'),
			limit: this.get('limit')
		});
	}),

	arrangedContent: alias('_limitProxy')
});

ArraySlice.computed = {
	slice: function (prop, offset, limit) {
		return computed(prop, function () {
			return ArraySlice.create({
				content: this.get(prop),
				offset: offset,
				limit: limit
			});
		});
	}
};

export default ArraySlice;
