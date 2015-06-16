import Em from 'ember';
import ArrayLimit from 'array-slice/array-limit';
var computed = Em.computed;

var TestLimitController = Em.Controller.extend({
	input: Em.A(),

	output: computed(function () {
		return ArrayLimit.create({
			content: this.get('input'),
			limit: 5
		});
	}),

	addItems: function (n) {
		for (var i = 0; i < n; i++) {
			this.addItem();
		}
	},

	addItem: function () {
		var input = this.get('input');
		var value = Em.get(input, 'length') + 1;
		input.pushObject(value);
	},

	removeItems: function (n) {
		var input = this.get('input');
		var length = Em.get(input, 'length');
		var index = Math.max(length - n, 0);
		input.replace(index, n);
	},

	init: function () {
		this.addItems(10);
	},

	actions: {
		offset: function (inc) {
			this.get('output').incrementProperty('offset', inc);
		},
		limit: function (inc) {
			this.get('output').incrementProperty('limit', inc);
		},
		items: function (inc) {
			if (inc >= 0) {
				this.addItems(inc);
			}
			else {
				this.removeItems(-inc);
			}
		}
	}
});

export default TestLimitController;
