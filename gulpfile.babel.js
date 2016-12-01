/* eslint-disable import/no-extraneous-dependencies */
import gulp from 'gulp';
import babel from 'gulp-babel';
import del from 'del';
import { exec } from 'child_process';
import esLint from 'gulp-eslint';

const paths = {
    allSrcJs: 'src/**/*.js',
    gulpFile: 'gulpfile.babel.js',
    libDir: 'lib'
};

gulp.task('clean', () => 
    del(paths.libDir)
);
gulp.task('build', ['lint', 'clean'], () => 
    gulp.src(paths.allSrcJs)
        .pipe(babel())
        .pipe(gulp.dest(paths.libDir))
);
gulp.task('main', ['build'], (callback) => {
    exec(`node ${paths.libDir}`, (error, stdout) => {
        console.log(stdout);
        return callback(error);
    });
});

gulp.task('lint', () => 
    gulp.src([
        paths.allSrcJs,
        paths.libDir
    ])
    .pipe(esLint())
    .pipe(esLint.format())
    .pipe(esLint.failAfterError())
);

gulp.task('watch', () => {
    gulp.watch(paths.allSrcJs, ['main']);
});
gulp.task('default', ['watch', 'main']);