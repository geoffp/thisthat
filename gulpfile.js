var gulp        = require('gulp');
var browserSync = require('browser-sync').create();

// Static server
gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
  gulp.watch([
    "*.js",
    "*.css",
    "*.html"
  ]).on('change', browserSync.reload);
});

// or...

// gulp.task('browser-sync', function() {
//   browserSync.init({
//     proxy: "yourlocal.dev"
//   });
// });

gulp.task('default', ['serve']);
