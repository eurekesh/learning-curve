var gulp = require('gulp'),
  ts = require('gulp-typescript'),
  exec = require('child_process').exec,
  nodemon = require('gulp-nodemon');

var projConfig = ts.createProject('server/tsconfig.json')

gulp.task('build-backend', () => {
  return gulp.src('server/**/*.ts')
    .pipe(projConfig())
    .pipe(gulp.dest('dist/'))
})

gulp.task('build-frontend', (cb) => {
  exec('ng build --output-path=dist/public --deleteOutputPath=false', (err, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  })
})

gulp.task('frontend', (cb) => {
  exec('ng build --output-path=dist/public --watch --deleteOutputPath=false', (err, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  })
})

gulp.task('hot-reload-server', (done) => {
  nodemon({
    script: 'dist/app.js',
    ignore: ['gulpfile.js', 'public/'],
    env: { 'NODE_ENV': 'development'},
    done: done
  });
  done();
})

gulp.task('hot-reload-backend', (done) => {
  gulp.watch('server/**/*.ts', gulp.series(['build-backend']));
});

// gulp.task('browser-sync', () => {
//   browserSync.init({
//     server: {
//       baseDir: './'
//     }
//   })
// })

gulp.task('default', (gulp.series('build-backend', gulp.parallel('frontend', 'hot-reload-backend', 'hot-reload-server'))), done => {
  done();
})

