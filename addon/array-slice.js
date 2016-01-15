import Em from 'ember';
import ArrayLimit from 'array-limit';
import ArrayOffset from 'array-offset';

var computed = Em.computed;
var alias = computed.alias;

var DEFAULT_OFFSET = 0;
var DEFAULT_LIMIT = Infinity;

var ArraySlice = Em.ArrayProxy.extend({
	offset: computed({
		get: function () {
			return DEFAULT_OFFSET;
		},
		set: function (key, offset) {
			this.set('_offsetProxy.offset', offset);
			return this.get('_offsetProxy.offset');
		}
	}),

	limit: computed({
		get: function () {
			return DEFAULT_LIMIT;
		},
		set: function (key, limit) {
			this.set('_limitProxy.limit', limit);
			return this.get('_limitProxy.limit');
		}
	}),

	content: computed({
		get: function () {
			return Em.A();
		},
		set:function (key, content) {
			this.set('_offsetProxy.content', content);
			return this.get('_offsetProxy.content');
		}
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
