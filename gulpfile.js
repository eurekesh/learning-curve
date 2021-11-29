var gulp = require('gulp'),
  ts = require('gulp-typescript'),
  spawn = require('cross-spawn'),
  nodemon = require('gulp-nodemon'),
  clean = require('gulp-clean');

var projConfig = ts.createProject('server/tsconfig.json')

gulp.task('clean-prod', function () {
  return gulp.src('dist/*', {read: false})
    .pipe(clean());
});

gulp.task('build-backend', () => {
  return gulp.src('server/**/*.ts')
    .pipe(projConfig())
    .pipe(gulp.dest('dist/server/'))
})

gulp.task('build-prod', (gulp.series('build-backend', 'build-frontend')), done => {
  done();
})

gulp.task('build-frontend', (cb) => {
  spawn('ng', ['build', '--output-path=dist/public', '--deleteOutputPath=false'], {stdio: 'inherit'});
})

gulp.task('frontend', (cb) => {
  spawn('ng', ['build', '--output-path=dist/public', '--deleteOutputPath=false', '--watch', '--verbose', '--optimization=false'], {stdio: 'inherit'});
})

gulp.task('hot-reload-server', (done) => {
  nodemon({
    script: 'dist/server/app.js',
    ignore: ['gulpfile.js', 'public/'],
    env: { 'NODE_ENV': 'development'},
    done: done
  });
  done();
})

gulp.task('hot-reload-backend', (done) => {
  gulp.watch('server/**/*.ts', gulp.series(['build-backend']));
});

gulp.task('default', (gulp.series('build-backend', gulp.parallel('frontend', 'hot-reload-backend', 'hot-reload-server'))), done => {
  done();
})

