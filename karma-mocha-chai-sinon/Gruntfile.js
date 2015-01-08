/*global module:false*/
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        // Task configuration.
        connect: {
            app: {
                options: {
                    port: 9001,
                    base: '.'
                }
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            gruntfile: {
                src: 'Gruntfile.js'
            },
            app: {
                src: ['app/**/*.js', 'test/**/*.js']
            }
        },
        karma: {
          unit: {
            configFile: 'karma.conf.js',
            options: {
            }
          }
        },
        watch: {
          gruntfile: {
            files: '<%= jshint.gruntfile.src %>',
            tasks: ['jshint:gruntfile']
          },
          app: {
            files: '<%= jshint.app.src %>',
            tasks: ['jshint:app', 'karma:unit']
          }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-karma');

    // Default task.
    grunt.registerTask('default', [
        'jshint',
        'karma'
    ]);

    grunt.registerTask('serve', [
        'default',
        'connect:app',
        'watch:app'
    ]);

};
