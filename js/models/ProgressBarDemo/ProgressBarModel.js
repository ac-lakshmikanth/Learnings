define(['Backbone','underscore'], function(Backbone,_) {
	
	var valsArr = [70,30,45];
	var namesArr = ['ProgressBar1','ProgressBar2','ProgressBar3'];
	var defaultsObj = {};
	
	_.each(namesArr,function(val,index,arr) {
		defaultsObj[val] = {
			name:val,
			width:valsArr[index],
			progressBarValue:valsArr[index]
		};
	});
	
	return Backbone.Model.extend({
		defaults: {
			progressBars: defaultsObj,
			selectedProgressBar: namesArr[1],
		},		
		initialize: function () {
			this.initData = JSON.stringify(this.defaults);
		},
		getDefaultData: function () {
			return JSON.parse(this.initData);
		}
	});	
});