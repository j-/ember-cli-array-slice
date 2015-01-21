import Em from 'ember';

var ArraySlice = Ember.ArrayProxy.extend({
	offset: 0,
	limit: Infinity,
	length: function () {
		var limit  = Math.max(this.get('limit'), 0);
		var offset = Math.max(this.get('offset'), 0);
		var right  = this.get('content.length') - offset;
		return Math.min(limit, right);
	}.property('offset', 'limit', 'content.length'),
	objectAtContent: function (i) {
		var offset = Math.max(this.get('offset'), 0);
		return this.get('content').objectAt(i + offset);
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
