define([
	'ractive',
	'app/js/models/ProgressBarDemo/ProgressBarModel',
	'app/js/views/ProgressBarDemo/ProgressBarsDemoView'], function(Ractive,ProgressBarModel,ProgressBarsDemoView) {
	
	return Backbone.View.extend({	
	
		className: 'TestProgressBarContainer',		
		model: null,
		view: null,
		
		initialize: function() {
			this.model = new ProgressBarModel();
			this.view = new ProgressBarsDemoView({model:this.model});			
		}
		
	});
});