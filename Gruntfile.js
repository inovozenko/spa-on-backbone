module.exports = function(grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        app: {
            dir: 'assets',
            img: 'assets/img',
            locales: 'assets/locales',
            dist: 'dist',
            context: ''
        },

        compass: {
            options: {
                sassDir: '<%= app.dir %>/scss',
                cssDir: '.tmp/css',
                httpStylesheetsPath: 'css',
                generatedImagesDir: '.tmp/img/generated',
                imagesDir: '<%= app.img %>',
                httpImagesPath: '../img',
                httpGeneratedImagesPath: '../img/generated',
                relativeAssets: false,
                assetCacheBuster: false,
                raw: 'Sass::Script::Number.precision = 10\n'
            },
            dist: {
                options: {
                    generatedImagesDir: '<%= app.dist %><%= app.context %>/img/generated',
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
                files: ['<%= app.dir %>/scss/**/*.{scss,sass}'],
                tasks: ['compass:server']
            },
            locales: {
                files: ['<%= app.locales %>/**/*.json'],
                tasks: ['copy:dev']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '{,*/}*.html',
                    '.tmp/css/{,*/}*.css',
                    '<%= app.img %>/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },
        // The actual grunt server settings
        connect: {
            options: {
                hostname: '0.0.0.0',
//                hostname: 'grunt.your-project.by',
                port: 9000,
                livereload: 35729
            },
            proxies: [
                {
                    context: '/app',
                    host: 'grunt.your-project.by',
                    port: 9000,
                    rewrite: {
                        '^/app/': '/'
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
                        '<%= app.dist %>/{,*/}*'
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
                src: ['<%= app.dir %>/scss/**/*.{scss,sass}'],
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
                    dest: '<%= app.dist %>',
                    src: [
                        '*.{ico,png,txt}',
                        '*.html'
                    ]
                }, {
                    expand: true,
                    cwd: '<%= app.img %>/',
                    dest: '<%= app.dist %><%= app.context %>/img/',
                    src: ['**']
                }, {
                    expand: true,
                    cwd: 'vendor/html5-boilerplate/js/vendor/',
                    dest: '<%= app.dist %><%= app.context %>/js/vendor',
                    src: ['modernizr-*.min.js']
                }, {
                    expand: true,
                    cwd: 'vendor/bootstrap-sass-official/assets/fonts/bootstrap',
                    src: ['**'],
                    dest: '<%= app.dist %><%= app.context %>/fonts/'
                }, {
                    expand: true,
                    cwd: '<%= app.locales %>/',
                    dest: '<%= app.dist %><%= app.context %>/locales/',
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
                        dest: '.tmp<%= app.context %>/js/vendor',
                        src: ['modernizr-*.min.js']
                    }, {
                        expand: true,
                        cwd: 'vendor/bootstrap-sass-official/assets/fonts/bootstrap',
                        src: ['**'],
                        dest: '.tmp/fonts/'
                    }, {
                        expand: true,
                        cwd: '<%= app.locales %>/',
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
                    '<%= app.dist %><%= app.context %>/js/*.js',
                    '<%= app.dist %><%= app.context %>/css/{,*/}*.css',
                    '<%= app.dist %><%= app.context %>/img/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
                    '!<%= app.dist %><%= app.context %>/img/portfolio/*',
                    '<%= app.dist %><%= app.context %>/fonts/*'
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
                dest: '<%= app.dist %>',
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
            html: ['<%= app.dist %>/{,*/}*.html'],
            css: ['<%= app.dist %><%= app.context %>/css/{,*/}*.css'],
            options: {
                basedir: '<%= app.dist %>',
                assetsDirs: [
                    '<%= app.dist %>',
                    '<%= app.dist %><%= app.context %>/img',
                    '<%= app.dist %><%= app.context %>/css'
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