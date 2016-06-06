define([
	'ractive',
	'rv!templates/button/button'
	],function(Ractive,ButtonTemplate) {
	
		return Ractive.extend({
			template: ButtonTemplate
		});
});