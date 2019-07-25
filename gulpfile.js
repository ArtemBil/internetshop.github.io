var gulp = require('gulp');
var plumber = require('gulp-plumber');
var less = require('gulp-less');

gulp.task('less', function() {
    return gulp.src('less/app.less')
        .pipe(plumber())
        .pipe(less())
        .pipe(gulp.dest('css/'));
});

gulp.task('watch:less', function() {
    gulp.watch('less/**/*.less', ['less']);
});