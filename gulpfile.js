var gulp = require('gulp');
var testServer = require('karma').Server;
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var changed = require('gulp-changed');
var del = require('del');
var replace = require('gulp-replace');
var requirejsOptimize = require('gulp-requirejs-optimize');

var paths = {
	'jspath': './js/',
	'js': ['js/**/*.js'],
	'csspath': './css/',
	'css': ['css/*.scss'],
	'rjs': ['js/controllers/**'],
	'rjspath': './js/controllers/min/',
	'jsmin': 'ProgressBars.min.js',
	'tests': ['testcases/**/*.js'],
	'cssmin': 'styles.min.css',
	'sourcemaps_path': './',
	'rjs_sourcemaps_path': './',
	'controller_module_name': '"ProgressBarDemo/ProgressBarController",'
};

//var modulesArr = ['./js/controllers/**/*.js'];

var requirejs_config = {
	allowSourceOverwrites: false,
	baseUrl: './js/controllers/',
	paths: {
		app: '../../',
		templates: '../templates',
		jquery: '../lib/jquery-1.10.2.min',
		underscore: '../lib/underscore-1.4.4.min',
		Backbone: '../lib/backbone-min',
		ractive: '../lib/ractive.runtime',
		'ractive-build': '../lib/ractive',
		'amd-loader': '../lib/amd-loader',
		tosource: '../lib/tosource',
		rv: '../lib/rv',
		l18n: '../lib/i18n'
	},
	//name: '../lib/almond-0.3.2',
	//include: ['./js/controllers/min/ProgressBarDemo/ProgressBarController.js'],
	//insertRequire: ['./js/controllers/min/ProgressBarDemo/ProgressBarController.js'],
	//wrap: true,
	//namespace: 'TestNS',
	//modules: ['js/controllers/**/*.js'],
	//dir: paths.jspath,
	
	//name: '../lib/almond-0.3.2',
    //include: ['main'],
    //insertRequire: ['main'],
    //out: 'main-built.js',
	
	//wrap: true,
	wrap: {
		start: '(function(){',
		end: '})();'
	},
	onModuleBundleComplete: function(data) {
		//console.log(data);
		console.log('------------MODULE BUNDLING COMPLETED--------------------');
	},
	logLevel: 0,
	wrapShim: true,
	stubModules: ['amd-loader','tosource','ractive-build','rv'],
	optimize: "uglify2",
	//modules: modulesArr,
	//dir: paths.rjspath,
	uglify2: {
		output: {
			beautify: false
		},
		compress: {
			drop_debugger: true,
			//drop_console: true,
			dead_code: true,
			unused: true,
			sequences: false
		},
		//warnings: true,
		mangle: false,
	},
	shim: {
		jquery: {
			exports: '$',
		},	
		underscore: {
			exports: '_',
		},
		ractive: {
			exports: ['ractive']
		},
		rv: {
			deps: ['ractive-build','amd-loader','tosource']
		},
		Backbone: {
			exports: 'Backbone',
			deps: ['jquery','underscore','ractive'],
		}
	},	
	preserveLicenseComments: false,
	findNestedDependencies: true
};

//gulp.task('clean-js',function(){
	//return del(['js/**/*.min.js','js/**/*.min.js.map']);
//});

gulp.task('clean-optimized-js',function(){
	return del([paths.rjspath]);
});

gulp.task('clean-css',function(){
	return del(['css/**/*.min.css','css/**/*.min.css.map']);
});

/*
gulp.task('minify_js',['clean-js'],function(){
	return gulp.src(paths.js)
	.pipe(sourcemaps.init())
	.pipe(uglify({
		semicolons:true,
		preserveComments: true,
		conditions:true,
		comparisons:true,
		dead_code:true,
		join_vars:true
	}))
	.pipe(jshint())
	.pipe(concat(paths.jsmin))
	.pipe(sourcemaps.write(paths.sourcemaps_path))
	.pipe(gulp.dest(paths.jspath));
});*/

gulp.task('optimize_js',['clean-optimized-js'],function(){
	return gulp.src(paths.rjs)
	//.pipe(changed(paths.jspath))
	//.pipe(clean(['js/**/*.min.js','js/**/*.min.js.map']))
	.pipe(jshint())
	.pipe(sourcemaps.init())
	.pipe(requirejsOptimize(requirejs_config))
	.pipe(replace(paths.controller_module_name,''))
	.pipe(sourcemaps.write(paths.rjs_sourcemaps_path))
	.pipe(gulp.dest(paths.rjspath))
});

gulp.task('minify_css',['clean-css'],function(){
	return gulp.src(paths.css)
	//.pipe(changed(paths.csspath))
	//.pipe(clean(['css/**/*.min.css','css/**/*.min.css.map']))
	.pipe(sourcemaps.init())
	.pipe(sass({
		outputStyle: 'compressed'
	}))
	.pipe(concat(paths.cssmin))
	.pipe(sourcemaps.write(paths.sourcemaps_path))
	.pipe(gulp.dest(paths.csspath));
});

gulp.task('run_tests',function(done){
	new testServer({
		configFile: __dirname + '/karma.conf.js'
	}).start();
});

// gulp.task('build',['run_tests','minify_js','minify_css'],function(){
// 	console.success('Success!!!');
// });

gulp.task('build',['optimize_js','minify_css','run_tests'],function(){
	console.log('------------------------------------Success!!!------------------------------------');
});

gulp.task('build_code',['optimize_js','minify_css'],function(){
	console.log('------------------------------------Success!!!------------------------------------');
});

