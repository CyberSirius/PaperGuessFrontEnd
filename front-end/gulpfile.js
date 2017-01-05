var gulp = require('gulp'),
    inject = require('gulp-inject'),
    angularFilesort = require('gulp-angular-filesort'),
    gnf = require('gulp-npm-files'),
    series = require('stream-series'),
    browserSync = require('browser-sync').create(),
    del = require('del'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    uglifycss = require('gulp-uglifycss'),
    useref = require('gulp-useref'),
    gulpIf = require('gulp-if'),
    cssnano = require('gulp-cssnano'),
    htmlmin = require('gulp-htmlmin'),
    templateCache = require('gulp-angular-templatecache');


gulp.task('inject', function () {
    // console.log(inject(gulp.src(['./app/**/*.js'])));
    return gulp.src('index.html')
        .pipe(inject(gulp.src(['./app/**/*.js']).pipe(angularFilesort())))
        .pipe(gulp.dest('./app'));
});

gulp.task('copy-npm', function () {
    return gulp.src(['node_modules/**/*']).pipe(gulp.dest('app/node_modules'));
});

gulp.task('build', ['copy-dep'], function () {
    return gulp.src('app/index.html')
        .pipe(inject(gulp.src(['build/app/**/*.js'])
            .pipe(angularFilesort()), {ignorePath: 'build'}))
        .pipe(gulp.dest('build'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('dirty-build', ['template-cache'], function () {
    gulp.src('app/**/*').pipe(gulp.dest('build'));
    gulp.src('app/index.html')
        .pipe(inject(gulp.src(['build/**/*.js'])
            .pipe(angularFilesort())))
        .pipe(gulp.dest('build'))
        .pipe(browserSync.reload({
            stream: true
        }));
});
gulp.task('template-cache', function () {
    return gulp.src('app/**/*.html')
        .pipe(templateCache('app.templates.js', {module: 'MoviesApp', root: 'app'}))
        .pipe(gulp.dest('app'));
});

gulp.task('watch', [], function () {
    browserSync.init({
        server: {
            baseDir: 'app'
        }
    });
    gulp.watch('app/**/*', ['inject']);
});