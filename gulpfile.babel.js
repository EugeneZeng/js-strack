/* eslint-disable import/no-extraneous-dependencies */
import gulp from 'gulp';
import babel from 'gulp-babel';
import del from 'del';
import webpack from 'webpack-stream';
import esLint from 'gulp-eslint';
import webpackConfig from './webpack.config.babel';

const paths = {
    allSrcJs: 'src/**/*.js?(x)',
    serverSrcJs: 'src/server/**/*.js?(x)',
    sharedSrcJs: 'src/shared/**/*.js?(x)',
    clientEntryPoint: 'src/client/app.js',
    gulpFile: 'gulpfile.babel.js',
    webpackFile: 'webpack.config.babel.js',
    libDir: 'lib',
    distDir: 'dist',
};

gulp.task('clean', () => 
    del(paths.libDir)
);
gulp.task('build', ['lint', 'clean'], () => 
    gulp.src([
        paths.allSrcJs,
        paths.sharedSrcJs
    ])
        .pipe(babel())
        .pipe(gulp.dest(paths.libDir))
);
gulp.task('main', ['build'], () => 
    gulp.src(paths.clientEntryPoint)
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest(paths.distDir))
);

gulp.task('lint', () => 
    gulp.src([
        paths.allSrcJs,
        paths.sharedSrcJs,
        paths.webpackFile,
        paths.gulpFile
    ])
    .pipe(esLint())
    .pipe(esLint.format())
    .pipe(esLint.failAfterError())
);

gulp.task('watch', () => {
    gulp.watch(paths.allSrcJs, ['main']);
});
gulp.task('default', ['watch', 'main']);
