var gulp = require("gulp");
var webpack = require("webpack-stream");
var webserver = require("gulp-webserver");

gulp.task("build", function() {
  gulp.src("./")
      .pipe(webpack(require("./webpack.config.js")))
      .pipe(gulp.dest("./dist/"));
});

gulp.task("watch-build", function() {
  gulp.watch(["./src/**/*.js", "./src/*.js"], ["build"]);
});

gulp.task("webserver", function() {
  gulp.src("./")
  .pipe(webserver({
    livereload: true,
    directoryListing: true,
    open: "index.html"
  }));
});

gulp.task("default", ["build", "watch-build", "webserver"]);
