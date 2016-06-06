require.config({
	baseUrl: './',
	paths: {
		app: '.'//,
		// templates: 'templates',
		// jquery: 'lib/jquery-1.10.2.min',
		// underscore: 'lib/underscore-1.4.4.min',
		// 'ractive-browser': 'lib/ractive.runtime',
		// Backbone: 'lib/backbone-min',
		// l18n: 'lib/i18n'
	},
	// shim: {
		// jquery: {
			// exports: '$',
		// },		
		// underscore: {
			// exports: '_',
		// },
		// 'ractive-browser': {
			// exports: ['ractive']
		// },
		// Backbone: {
			// exports: 'Backbone',
			// deps: ['jquery','underscore','ractive-browser'],
		// }
	// }
});

require(['app/js/controllers/min/ProgressBarDemo/ProgressBarController'],function(Controller){
	window.ProgressBarController = new Controller();
});
