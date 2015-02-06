import Em from 'ember';
import ArraySlice from 'array-slice';

var IndexController = Em.Controller.extend({
	count: 15,

	input: Em.A(),

	updateInput: function () {
		var count = this.get('count');
		var items = this.get('input');
		for (var i = items.get('length'); i < count; i++) {
			items.pushObject(i + 1);
		}
	}.on('init').observes('count'),

	output: ArraySlice.computed.slice('input', 0, 5),

	actions: {
		offset: function (inc) {
			this.get('output').incrementProperty('offset', inc);
		},
		limit: function (inc) {
			this.get('output').incrementProperty('limit', inc);
		},
		items: function (inc) {
			this.incrementProperty('count', inc);
		}
	}
});

export default IndexController;
