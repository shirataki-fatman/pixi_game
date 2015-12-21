var gulp = require("gulp");
var webpack = require("webpack-stream");
var webserver = require("gulp-webserver");

gulp.task("build", function() {
  gulp.src("./")
      .pipe(webpack(require("./webpack.config.js")));
});

gulp.task("watch-build", function() {
  gulp.watch(["./src/**/*.js", "./src/*.js"], ["build"]);
});

gulp.task("webserver", function() {
  gulp.src("./")
  .pipe(webserver({
    livereload: true,
    directoryListing: true,
    open: true
  }));
});

gulp.task("default", ["build", "watch-build", "webserver"]);
