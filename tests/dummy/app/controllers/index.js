import Em from 'ember';
import ArraySlice from 'array-slice';

var IndexController = Em.Controller.extend({
	items: 15,

	input: function () {
		var items = this.get('items');
		var result = [];
		for (var i = 0; i < items; i++) {
			result.push(i + 1);
		}
		return result;
	}.property(),

	output: ArraySlice.computed.slice('input', 0, 5),

	actions: {
		offset: function (inc) {
			this.get('output').incrementProperty('offset', inc);
		},
		limit: function (inc) {
			this.get('output').incrementProperty('limit', inc);
		}
	}
});

export default IndexController;
