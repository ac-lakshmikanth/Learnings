define([
	'ractive',
	'rv!templates/progressbar/progressbar'
	],function(Ractive,ProgressBarTemplate) {
	
		return Ractive.extend({
			template: ProgressBarTemplate
		});
});