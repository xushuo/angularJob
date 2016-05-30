/**
 * Created by hadoop on 2016/5/11.
 */
module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        csslint: {
            /* 检查 CSS 语法 */
            src: ['app/css/**/*.css']
        },

        jshint: {
            /* 检查 js 语法 */
            files: ['Gruntfile.js', 'app/js/**/*.js'],
            options: {
                //这里是覆盖JSHint默认配置的选项
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                }
            }
        },
        imagemin: {
            /* 压缩优化图片大小 */
            dist: {
                options: {
                    optimizationLevel: 3
                },
                files: [
                    {
                        expand: true,
                        cwd: 'app/img/',
                        src: ['**/*.{png,jpg,jpeg}'], // 优化 img 目录下所有 png/jpg/jpeg 图片
                        dest: 'app/dist/img/' // 优化后的图片保存位置，默认覆盖
                    }
                ]
            }
        },
        concat: {
            /* 合并 CSS 文件 */
            css: {
                src: ['app/css/**/*.css'],
                /* 根据目录下文件情况配置 */
                dest: 'app/dist/css/all.css'
            },
            js: {
                src: ['app/js/**/*.js'],
                /* 根据目录下文件情况配置 如果可以使用 require.js/LABjs 等配置更佳 */
                dest: 'app/dist/js/all.js'
            }
        },
        cssmin: {
            /*压缩 CSS 文件为 .min.css */
            options: {
                keepSpecialComments: 0 /* 移除 CSS 文件中的所有注释 */
            },
            minify: {
                expand: true,
                cwd: 'app/dist/css/',
                src: ['all.css'],
                dest: 'app/dist/css/',
                ext: '.min.css'
            }
        },
        uglify: {
            /* 最小化、混淆、合并 JavaScript 文件 */
            options: {
                banner: '/*! <%= pkg.name %>-<%= pkg.version %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            build: {
                src:'app/js/**/*.js',
                dest:'app/dist/js/<%= pkg.name %>-<%= pkg.version %>.min.js'
            }
        },
        watch: {
            /* 监控文件变化并执行相应任务 */
            img: {
                files: ['app/img/**/*.{png,jpg,jpeg}'],
                options: {
                    livereload: true
                }
            },
            css: {
                options: {
                    event: ['changed', 'added'],
                    livereload: true
                },
                files: ['app/css/**/*.css']
            },
            js: {
                options: {
                    livereload: true
                },
                files: ['app/js/**/*.js']
            },
            html: {
                options: {
                    livereload: true
                },
                files: ['*.html']
            }
        }
    });


    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    // 定义默认任务
    grunt.registerTask('default', ['csslint', 'jshint', 'imagemin',  'concat', 'cssmin','uglify']);
    grunt.registerTask('css', ['concat:css', 'cssmin']);
    grunt.registerTask('dev', ['csslint', 'jshint']);
    grunt.registerTask('simple', ['imagemin', 'concat', 'cssmin','uglify']);
    grunt.registerTask('dest', ['imagemin', 'concat:css', 'cssmin', 'uglify:minjs']);

};