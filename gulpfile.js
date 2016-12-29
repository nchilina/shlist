/**
 * Created by nchilina on 27/12/16.
 */
var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('webpack');
var browsersync = require('browser-sync');

var webpackConf = require('./webpack.config');
var browsersyncConf = require('./bs-config');

gulp.task('webpack', function() {
  var webpackBundler = webpack(webpackConf);
  var webpackChangeHandler = function(err, stats) {
    if(err) {
      gutil.log('[Webpack] Error:', err);
    }
    gutil.log('[Webpack]', stats.toString({
        colors:true,
        hash: false,
        chunks: false,
        version: true
      }));
    browsersync.reload();
  };
  //webpackBundler.run(webpackChangeHandler);
  webpackBundler.watch(200, webpackChangeHandler);

  });

gulp.task('browsersync', function(done) {
  browsersync.init(browsersyncConf);
  done();
});

gulp.task('serve', ['webpack', 'browsersync']);
