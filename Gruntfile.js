module.exports = function (grunt) {
	grunt.initConfig({
		clean: {
			js: [
				'!js/*.js','js/*.min.js','js/*.min.js.map',
				'!css/*.scss','css/*.min.css','css/*.min.css.map'
			]
		},
		jshint: {
			options: {
				eqeqeq: true,
				curly: true,
				eqnull: true,
				undef: true,
				globals: {
					describe: true,
					it: true,
					progressBars: true,
					expect: true,
					Ractive: true	
				}
			},
			check_js_hint: {
				files: {
					src: ['js/*.js','!js/*.min.js','!js/*.min.js.map','testcases/*.js']
				}
			}
		},
		uglify: {
			options: {
				sourceMap: true,
				preserveComments: false,
				compress: {
					dead_code: true,
					conditionals: true,
					comparisons: true,
					join_vars: true
				}
			},
			minify_js: {
				files: [{
					expand: true,
					cwd:'js/',
					src:'*.js',
					dest:'js/',
					ext: '.min.js'					
				}]
			}
		},
		sass: {
			options: {
				style: 'compressed'
			},
			minify_css: {
				files: [{
					expand: true,
					cwd:'css',
					src:['*.scss'],
					dest:'css/',
					ext: '.min.css'					
				}]
			} 
		},
		karma: {
			run_testcases: {
				options: {
					configFile: 'karma.conf.js'
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-karma');

	grunt.registerTask('default',['clean','jshint','uglify','sass','karma']);
};
