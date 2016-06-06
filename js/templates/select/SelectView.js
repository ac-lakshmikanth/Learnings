define([
	'ractive',
	'rv!templates/select/select'
	],function(Ractive,SelectTemplate) {
	
		return Ractive.extend({
			template: SelectTemplate
		});
});