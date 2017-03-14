/**
 * File name: Gruntfile.js
 * Author: Lindon Camaj
 * Date: 7/2/2015
 * Copyright (c) 2015 Bild Studio
 * http://www.bild-studio.com
 */
module.exports = function(grunt){

    grunt.initConfig({

        pkg: grunt.file.readJSON("package.json"),


        appCss: grunt.file.readJSON("config/css.app.json"),


        tag: {
            banner: '/*!\n' +
            ' * <%= pkg.title %>\n' +
            ' * <%= pkg.url %>\n' +
            ' * @author <%= pkg.author %>\n' +
            ' * @version <%= pkg.version %>\n' +
            ' * Copyright (c) <%= pkg.copyright %>. All rights reserved.\n' +
            ' */\n'
        },

        // clean
        clean: {
            all: ['dist/**'],
            images: ['dist/images/**'],
            index_dev: ['dist/index-dev.html']
        },

        // copy
        copy:{
            dev: {
                files:[
                    {expand: true,cwd: 'src/fonts/',src: ['**'], dest: 'dist/fonts/'},
                ]
            },
            production: {
                files:[
                    {expand: true,cwd: 'src/fonts/',src: ['**'], dest: 'dist/fonts/'},
                ]
            }

        },

        // include source
        includeSource: {
            options: {
                basePath: '',
                typeMappings: {
                    'html': 'html'
                }
            },
            dev: {
                files: {
                    'index.html': 'src/index/index_dev.html'
                }
            },
            production: {
                files: {
                    'dist/index.html': 'src/index/index.html'
                }
            }
        },

        // Optimize images
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: "src/images/",
                    src: ["**/*.{png,jpg}"],
                    dest: "dist/images/"
                }]
            }
        },


        // jshint
        jshint: {
            app: ['src/js/app/**/*.js'],
            appCompontents: ['src/js/app/**/*.js'],
            options: {
                notypeof: true,
                debug: true,
                eqnull: true,
                eqeqeq: false,
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                }
            }
        },

        // concat - used when sending to production
        concat: {
            options: {
                banner: '<%= tag.banner %>',
                separator: '\n\n/* ------------------------------------------------------------------------------------------------------------ */\n\n'
            },

            vendor:{
                src: grunt.file.readJSON("config/src.vendor.json"),
                dest: "dist/js/vendor.js"
            },

            angularApp: {
                src: grunt.file.readJSON("config/src.app.json"),
                dest: 'dist/js/app.js'
            }

        },

        // Compress css files in odrder to be smaller
        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            target: {
                files: [{
                     expand: true,
                     cwd: 'dist',
                     src: ['**/*.css'],
                     dest: 'dist',
                     ext: '.css'
                }]
            }
        },

        // uglify javascript files - used when sending to production
        uglify: {

            options: {
                banner: '<%= tag.banner %>',
                beautify : false,
                mangle: false,
                compress: true,
                sourceMap: false
            },

            vendor: {
                files: {
                    'dist/js/vendor.js': ['<%= concat.vendor.dest %>']
                }
            },

            angularApp: {
                files: {
                    'dist/js/app.js': ['<%= concat.angularApp.dest %>']
                }
            }
        },

        // sass configuration
        sass: {
            dist: {
                options: {
                    noCache: true,
                    style: 'compressed'
                },
                files: {
                    'dist/css/main.css': 'src/sass/main.scss'
                }
            }
        },

        // ng templates
        ngtemplates:{
            app:{
                cwd: "src/js/app/",
                src: "**/*.html",
                dest: "src/js/app/templates.js",
                options:{
                    htmlmin: { collapseWhitespace: true, collapseBooleanAttributes: true, removeComments: false }
                }
            }
        },


        // Watch file changes
        watch: {
            options: {
                livereload: true
            },

            // Watch CSS
            css: {
                files: ["src/sass/**/*.scss"],
                tasks: ["sass"],
                options: {
                    spawn: false
                }
            },

            images: {
                files: ["src/images/**"],
                tasks: ["clean:images", "imagemin"]
            },

            mainTemplates: {
                files: ['src/js/app/**/*.html'],
                tasks: ['clean:index_dev', 'copy:dev', 'ngtemplates:app', 'includeSource:dev']
            },

            srcApp:{
                files: grunt.file.readJSON("config/src.app.json"),
                tasks: ['clean:index_dev', 'copy:dev', 'includeSource:dev']
            }
        },

        browserSync: {
            dev:{
                options: {
                    server: {
                        baseDir: "./"
                    }
                }
            }
        }

    });

    // Load Grunt Tasks Plugins

    // This speed up task loading 500%
    require('jit-grunt')(grunt, {
        ngtemplates: 'grunt-angular-templates'
    });

    grunt.registerTask("dev", [
        "clean:all", "copy:dev", "ngtemplates", "imagemin", "sass", "includeSource:dev"
    ]);

    grunt.registerTask("production", [
        "clean:all", "copy:production", "ngtemplates", "imagemin", "sass", "concat", "uglify", "cssmin"
    ]);

    grunt.registerTask("js-rebuild", [
        "copy:dev", "ngtemplates", "includeSource:dev"
    ]);

    grunt.registerTask("start", ["browserSync"]);
};
