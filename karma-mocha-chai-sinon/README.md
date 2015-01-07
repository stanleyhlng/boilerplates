* mkdir <new_dir>
* cd <new_dir>
* npm init
* npm install mocha --save-dev
* npm install karam --save-dev
* npm install karam-mocha --save-dev
* npm install karam-chai --save-dev
* npm install karam-sinon --save-dev

```
{
  "name": "demo",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "chai": "^1.10.0",
    "karma": "^0.12.31",
    "karma-chai": "^0.1.0",
    "karma-chrome-launcher": "^0.1.7",
    "karma-mocha": "^0.1.10",
    "karma-sinon": "^1.0.4",
    "mocha": "^2.1.0",
    "sinon": "^1.12.2"
  }
}
```

* ./node_modules/karma/bin/karma --version
```
Karma version: 0.12.31
```

* ./node_modules/karam/bin/karam init

```
// Karma configuration
// Generated on Tue Jan 06 2015 20:37:11 GMT-0800 (PST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: 'src',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai', 'sinon'],


    // list of files / patterns to load in the browser
    files: [
        'js/**/*.js',
        'test/**/*.spec.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


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
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true
  });
};
```

* mkdir -p src/test
* cat src/test/dummy.spec.js

```
describe('A test suite', function () {

    beforeEach(function () {

    });

    afterEach(function () {

    });

    it ('should fail', function () {
        expect(true).to.be.false;
    });

});
```

* ./node_modules/karma/bin/karma start karma.conf.js

```
Chrome 39.0.2171 (Mac OS X 10.10.1) A test suite should fail FAILED
	AssertionError: expected true to be false
Chrome 39.0.2171 (Mac OS X 10.10.1): Executed 1 of 1 (1 FAILED) ERROR (0.007 secs / 0.002 secs)
```
