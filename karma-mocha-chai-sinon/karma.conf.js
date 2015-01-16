// Karma configuration
// Generated on Tue Jan 06 2015 20:37:11 GMT-0800 (PST)
// http://karma-runner.github.io/0.8/config/configuration-file.html

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai', 'sinon', 'chai-sinon', 'fixture'],


    // list of files / patterns to load in the browser
    files: [
        // dependencies
        // JavaScript Core Libaries
        'bower_components/underscore/underscore.js',
        'bower_components/jquery/dist/jquery.js',
        'bower_components/backbone/backbone.js',
        'bower_components/backbone.localStorage/backbone.localStorage-min.js',
        'bower_components/showdown/compressed/Showdown.min.js',

        // JavaScript Application Libaries
        'app/js/app/namespace.js',
        'app/js/app/config.js',
        'app/js/app/models/note.js',
        'app/js/app/collections/notes.js',
        'app/js/app/templates/templates.js',
        'app/js/app/views/note-view.js',
        'app/js/app/views/note-nav.js',
        'app/js/app/views/note.js',
        'app/js/app/views/notes-item.js',
        'app/js/app/routers/router.js',

        'test/js/**/*.spec.js',

        // fixtures
        {pattern: 'test/js/spec/fixtures/**/*', watched: true, served: true, include: false}
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        'app/js/**/*.js': ['coverage'],
        'test/js/spec/fixtures/**/*.html': ['html2js'],
        'test/js/spec/fixtures/**/*.json': ['html2js']
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_ERROR,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS', 'Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true

  });
};
