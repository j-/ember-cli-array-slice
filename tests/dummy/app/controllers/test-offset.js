import Em from 'ember';
import ArrayOffset from 'array-slice/array-offset';
var computed = Em.computed;

var TestOffsetController = Em.Controller.extend({
	input: Em.A(),

	output: computed({
		get: function () {
			return ArrayOffset.create({
				content: this.get('input'),
				offset: 0
			});
		}
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

export default TestOffsetController;
