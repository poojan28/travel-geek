/* jshint node:true */
module.exports = function (grunt) {
    /**
     * FIles added to WordPress SVN, don't inlucde 'assets/**' here.
     * @type {Array}
     */
	svn_files_list = [
		'css/**',
		'fonts/**',
		'framework/**',
		'image/**',
		'inc/**',
		'js/**',
		'languages/**',
		'libraries/**',
		'template-parts/**',
		'webfonts/**',
		'wp-travel/**',
		'404.php',
		'archive.php',
		'comments.php',
		'footer.php',
		'front-page.php',
		'functions.php',
		'header.php',
		'index.php',
		'LICENSE',
		'page.php',
		'README.md',
		'readme.txt',
		'rtl.css',
		'screenshot.png',
		'search.php',
		'sidebar.php',
		'single.php',
		'style.css',
		'wpml-config.xml',
	];

    /**
     * Let's add a couple of more files to github.
     * @type {Array}
     */
	git_files_list = svn_files_list.concat([
		'\.editorconfig',
		'\.gitignore',
		'\.jshintrc',
		'Gruntfile.js',
		'package-lock.json',
		'package.json',
	]);

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),
		clean: {
			post_build: [
				'build'
			],
			postx_build: [
				'build/<%= pkg.name %>'
			]
		},
		copy: {
			build_it: {
				options: {
					mode: true
				},
				expand: true,
				src: svn_files_list,
				dest: 'build/<%= pkg.name %>/'
			},
			deploy: {
				src: [
					'**',
					'!.*',
					'!*.md',
					'!.*/**',
					'!tmp/**',
					'!Gruntfile.js',
					'!test.php',
					'!package.json',
					'!node_modules/**',
					'!tests/**',
					'!docs/**'
				],
				dest: 'deploy/<%= pkg.name %>',
				expand: true,
				dot: true
			}
		},
		// Setting folder templates.
		dirs: {
			js: 'js',
			css: 'css',
			images: 'images'
		},
		"file-creator": {
			"folder": {
				".gitattributes": function (fs, fd, done) {
					var glob = grunt.file.glob;
					var _ = grunt.util._;
					fs.writeSync(fd, '# We don\'t want these files in our "plugins.zip", so tell GitHub to ignore them when the user click on Download ZIP' + '\n');
					_.each(git_files_list.diff(svn_files_list), function (filepattern) {
						glob.sync(filepattern, function (err, files) {
							_.each(files, function (file) {
								fs.writeSync(fd, '/' + file + ' export-ignore' + '\n');
							});
						});
					});
				}
			}
		},
		// Other options.
		options: {
			text_domain: 'Business-toy'
		},
		// Generate POT files.
		makepot: {
			target: {
				options: {
					type: 'wp-theme',
					domainPath: 'languages',
					exclude: ['deploy/.*', 'node_modules/.*', 'build/.*'],
					updateTimestamp: false,
					potHeaders: {
						'report-msgid-bugs-to': '',
						'x-poedit-keywordslist': true,
						'language-team': '',
						'Language': 'en_US',
						'X-Poedit-SearchPath-0': '../../<%= pkg.name %>',
						'plural-forms': 'nplurals=2; plural=(n != 1);',
						'Last-Translator': 'WEN Solutions <info@wensolutions.com>'
					}
				}
			}
		},

		// Update text domain.
		addtextdomain: {
			options: {
				textdomain: '<%= options.text_domain %>',
				updateDomains: true
			},
			target: {
				files: {
					src: [
						'*.php',
						'**/*.php',
						'!node_modules/**',
						'!deploy/**',
						'!tests/**'
					]
				}
			}
		},

		// Check textdomain errors.
		checktextdomain: {
			options: {
				text_domain: '<%= options.text_domain %>',
				keywords: [
					'__:1,2d',
					'_e:1,2d',
					'_x:1,2c,3d',
					'esc_html__:1,2d',
					'esc_html_e:1,2d',
					'esc_html_x:1,2c,3d',
					'esc_attr__:1,2d',
					'esc_attr_e:1,2d',
					'esc_attr_x:1,2c,3d',
					'_ex:1,2c,3d',
					'_n:1,2,4d',
					'_nx:1,2,4c,5d',
					'_n_noop:1,2,3d',
					'_nx_noop:1,2,3c,4d'
				]
			},
			files: {
				src: [
					'**/*.php',
					'!node_modules/**',
					'!deploy/**'
				],
				expand: true
			}
		},

		uglify: {
			options: {
				mangle: false
			},
			my_target: {
				files: {
				}
			}
		},
		sass: {
			dist: {
				files: {
					'css/style.css': 'sass/style.scss',
					'css/blog.css': 'sass/blog.scss',
					'css/detail.css': 'sass/detail.scss',
				}
			}
		},
		//CSS minification.
		cssmin: {
			target: {
				files: {
					'css/style.min.css': ['css/style.css'],
					'css/blog.min.css': ['css/blog.css'],
					'css/detail.min.css': ['css/detail.css'],
				}
			}
		},
		autoprefixer: {
            dist: {
                files: {
					'css/style.css': 'css/style.css',
					'css/blog.css': 'css/blog.css',
					'css/detail.css': 'css/detail.css',
                }
            }
		},
		browserSync: {
            dev: {
                bsFiles: {
                    src : [
                        'css/*.css',
                        '*.php'
                    ]
                },
                options: {
                    watchTask: true,
					proxy: "theme-development.test",
					files: ['wp-content/themes/travel-geek-html']
                }
            }
        },
		watch: {
			css: {
				files: ['sass/**/*.scss'],
				tasks: ['sass', 'cssmin','autoprefixer'],
				options: { livereload: true }
			}
		},
		

		// Check JS.
		jshint: {
			// options: grunt.file.readJSON( '.jshintrc' ),
			all: [
				'Gruntfile.js',
				'<%= dirs.js %>/*.js',
				'!<%= dirs.js %>/*.min.js'
			]
		},

		// Clean the directory.
		clean: {
			deploy: ['deploy']
		},

		// Compress files.
		compress: {
			deploy: {
				expand: true,
				options: {
					archive: 'deploy/<%= pkg.name %>-<%= pkg.version %>.zip'
				},
				cwd: 'deploy/<%= pkg.name %>/',
				src: ['**/*', '!build/**'],
				dest: '<%= pkg.name %>/'
			}
		},

		zip: {
			// 'build/<%= pkg.name %>-<%= pkg.version %>.zip': [svn_files_list]
			'using-delate': {
				cwd: 'build/',
				src: ['build/<%= pkg.name %>/**'],
				dest: 'build/<%= pkg.name %>-<%= pkg.version %>.zip',
				compression: 'DEFLATE'
			}
		},

		rtlcss: {
			myTask: {
				// task options
				options: {
					// generate source maps
					map: { inline: false },
					// rtlcss options
					opts: {
						clean: false
					},
					// rtlcss plugins
					plugins: [],
					// save unmodified files
					saveUnmodified: true,
				},
				expand: true,
				cwd: 'assets/css',
				dest: 'assets/css/rtl/',
				src: ['assets/css/*.css']
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-wp-i18n');
	grunt.loadNpmTasks('grunt-checktextdomain');
	grunt.loadNpmTasks('grunt-contrib-compress');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-file-creator');
	grunt.loadNpmTasks('grunt-svn-export');
	grunt.loadNpmTasks('grunt-push-svn');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-watch');


	// Load in `grunt-zip`
	grunt.loadNpmTasks('grunt-zip');

	grunt.loadNpmTasks('grunt-rtlcss');
	//browser sync
	grunt.loadNpmTasks('grunt-browser-sync');
	// Register tasks.
	grunt.registerTask('default', []);

	grunt.registerTask('gitattributes', ['file-creator']);

	grunt.registerTask('assets', [
		'uglify',
		'sass',
		'cssmin',
		'autoprefixer',
	]);

	grunt.registerTask('precommit', [
		'jshint',
		'checktextdomain'
	]);

	grunt.registerTask('textdomain', [
		'addtextdomain',
		'makepot'
	]);
	grunt.registerTask('minify', [
		'uglify',
		'cssmin',
	]);

	grunt.registerTask('rtlcss', [
		'rtlcss',
	]);

	grunt.registerTask('deploy', [
		'clean:deploy',
		'copy:deploy',
		'compress:deploy'
	]);

	grunt.registerTask('pre_vcs', ['assets', 'textdomain']);
	grunt.registerTask('pre_release', ['pre_vcs']);
	grunt.registerTask('release', ['push_svn']);
	grunt.registerTask('post_release', ['clean:post_build']);
	grunt.registerTask('build', ['assets', 'makepot', 'clean:deploy', 'copy:build_it', 'addtextdomain', 'zip']);

};

/**
 * Helper
 */
// from http://stackoverflow.com/a/4026828/1434155
Array.prototype.diff = function (a) {
	return this.filter(function (i) { return a.indexOf(i) < 0; });
};