var allTestFiles = [];
var TEST_REGEXP = /(spec|test)\.js$/i;

// Get a list of all the test files to include
Object.keys(window.__karma__.files).forEach(function(file) {
  if (TEST_REGEXP.test(file)) {
    // Normalize paths to RequireJS module names.
    // If you require sub-dependencies of test files to be loaded as-is (requiring file extension)
    // then do not normalize the paths
		//var normalizedTestModule = file.replace(/^\/base\/|\.js$/g, '');
		//allTestFiles.push(normalizedTestModule);
	allTestFiles.push(file);
  }
});

require.config({
  // Karma serves files under /base, which is the basePath from your config file
  baseUrl: '/base',
  paths: {
		app: '.'//,
		//templates: 'js/templates',
		//jquery: 'js/lib/jquery-1.10.2.min',
		//underscore: 'js/lib/underscore-1.4.4.min',
		//'ractive-browser': 'js/lib/ractive.runtime',
		//Backbone: 'js/lib/backbone-min',
		//l18n: 'js/lib/i18n'
  },
  shim: {		
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
  },

  // dynamically load all test files
  deps: allTestFiles,

  // we have to kickoff jasmine, as it is asynchronous
  callback: window.__karma__.start
});

//require(allTestFiles,function(allTestFiles){
	//alert(allTestFiles);
	//console.log('----------------------allTestFiles1--------------------------------');
	//allTestFiles();
	//console.log('----------------------allTestFiles2--------------------------------'+allTestFiles);
//});