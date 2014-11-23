var gulp = require('gulp'),
    jshint = require('gulp-jshint')
    uglify = require('gulp-uglify');

gulp.task('default', function() {
   gulp.src('*/*.js')
       .pipe(uglify())
       .pipe(gulp.dest('build'));
});

gulp.task('jsLint', function () {
    gulp.src('*/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter());
});
