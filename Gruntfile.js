module.exports = function(grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        coalition: {
            dir: 'assets',
            img: 'assets/img',
            locales: 'assets/locales',
            dist: 'dist',
            context: ''
        },

        compass: {
            options: {
                sassDir: '<%= coalition.dir %>/scss',
                cssDir: '.tmp/css',
                httpStylesheetsPath: 'css',
                generatedImagesDir: '.tmp/img/generated',
                imagesDir: '<%= coalition.img %>',
                httpImagesPath: '../img',
                httpGeneratedImagesPath: '../img/generated',
                relativeAssets: false,
                assetCacheBuster: false,
                raw: 'Sass::Script::Number.precision = 10\n'
            },
            dist: {
                options: {
                    generatedImagesDir: '<%= coalition.dist %><%= coalition.context %>/img/generated',
                    environment: 'production'
                }
            },
            server: {
                options: {
                    sourcemap: true
                }
            }
        },
        watch: {
            bower: {
                files: ['bower.json'],
                tasks: ['wiredep']
            },
            compass: {
                files: ['<%= coalition.dir %>/scss/**/*.{scss,sass}'],
                tasks: ['compass:server']
            },
            locales: {
                files: ['<%= coalition.locales %>/**/*.json'],
                tasks: ['copy:dev']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '{,*/}*.html',
                    '.tmp/css/{,*/}*.css',
                    '<%= coalition.img %>/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },
        // The actual grunt server settings
        connect: {
            options: {
                hostname: 'grunt.yourproject.by',
                port: 9000,
                livereload: 35729
            },
            proxies: [
                {
                    context: '/yourproject',
                    host: 'grunt.yourproject.by',
                    port: 9000,
                    rewrite: {
                        '^/yourproject/': '/'
                    }
                }
            ],
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            connect.static('.tmp'),
                            connect.static('./'),
                            connect.static('assets'),
                            require('grunt-connect-proxy/lib/utils').proxyRequest
                        ];
                    }
                }
            }
        },

        // Run some tasks in parallel to speed up the build process
        concurrent: {
            server: [
                'compass:server'
            ],
            test: [
                'compass'
            ],
            dist: [
                'compass:dist'
            ]
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= coalition.dist %>/{,*/}*'
                    ]
                }]
            },
            server: '.tmp'
        },

        // Automatically inject Bower components into the app
        wiredep: {
            app: {
                src: [
                    'index.html'
                ],
                ignorePath:  /\.\.\//,
                exclude: [
                    'vendor/bootstrap-sass-official/assets/javascripts/bootstrap.js',
                    'vendor/bootstrap/dist/css/bootstrap.css'
                ]
            },
            sass: {
                src: ['<%= coalition.dir %>/scss/**/*.{scss,sass}'],
                ignorePath: /(\.\.\/){1,2}bower_components\//
            }
        },


        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '.',
                    dest: '<%= coalition.dist %>',
                    src: [
                        '*.{ico,png,txt}',
                        '*.html'
                    ]
                }, {
                    expand: true,
                    cwd: '<%= coalition.img %>/',
                    dest: '<%= coalition.dist %><%= coalition.context %>/img/',
                    src: ['**']
                }, {
                    expand: true,
                    cwd: 'vendor/html5-boilerplate/js/vendor/',
                    dest: '<%= coalition.dist %><%= coalition.context %>/js/vendor',
                    src: ['modernizr-*.min.js']
                }, {
                    expand: true,
                    cwd: 'vendor/bootstrap-sass-official/assets/fonts/bootstrap',
                    src: ['**'],
                    dest: '<%= coalition.dist %><%= coalition.context %>/fonts/'
                }, {
                    expand: true,
                    cwd: '<%= coalition.locales %>/',
                    dest: '<%= coalition.dist %><%= coalition.context %>/locales/',
                    src: ['**']
                }]
            },
            styles: {
                expand: true,
                cwd: 'css/',
                dest: '.tmp/css/',
                src: '{,}*.css'
            },
            dev: {
                files: [
                    {
                        expand: true,
                        cwd: 'vendor/html5-boilerplate/js/vendor/',
                        dest: '.tmp<%= coalition.context %>/js/vendor',
                        src: ['modernizr-*.min.js']
                    }, {
                        expand: true,
                        cwd: 'vendor/bootstrap-sass-official/assets/fonts/bootstrap',
                        src: ['**'],
                        dest: '.tmp/fonts/'
                    }, {
                        expand: true,
                        cwd: '<%= coalition.locales %>/',
                        dest: '.tmp/locales/',
                        src: ['**']
                    }
                ]
            }
        },

        // Renames files for browser caching purposes
        filerev: {
            dist: {
                src: [
                    '<%= coalition.dist %><%= coalition.context %>/js/*.js',
                    '<%= coalition.dist %><%= coalition.context %>/css/{,*/}*.css',
                    '<%= coalition.dist %><%= coalition.context %>/img/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
                    '!<%= coalition.dist %><%= coalition.context %>/img/portfolio/*',
                    '<%= coalition.dist %><%= coalition.context %>/fonts/*'
                ]
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            html: [
                'index.html'
            ],
            options: {
                dest: '<%= coalition.dist %>',
                flow: {
                    html: {
                        steps: {
                            js: ['concat'/*, 'uglifyjs'*/],
                            css: ['cssmin']
                        },
                        post: {}
                    }
                }
            }
        },

        // Performs rewrites based on filerev and the useminPrepare configuration
        usemin: {
            html: ['<%= coalition.dist %>/{,*/}*.html'],
            css: ['<%= coalition.dist %><%= coalition.context %>/css/{,*/}*.css'],
            options: {
                basedir: '<%= coalition.dist %>',
                assetsDirs: [
                    '<%= coalition.dist %>',
                    '<%= coalition.dist %><%= coalition.context %>/img',
                    '<%= coalition.dist %><%= coalition.context %>/css'
                ]
            }
        }

    });

    grunt.loadNpmTasks('grunt-connect-proxy');

    grunt.registerTask('default', ['install']);

    grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'wiredep',
            'copy:dev',
            'concurrent:server',
            'configureProxies:server',
            'connect:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('server', 'DEPRECATED TASK. Use the "serve" task instead', function (target) {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run(['serve:' + target]);
    });

    grunt.registerTask('build', [
        'clean:dist',
        'wiredep',
        'useminPrepare',
        'concurrent:dist',
        'concat',
        'copy:dist',
        'cssmin',
//        'uglify',
        'filerev',
        'usemin'
    ]);
};