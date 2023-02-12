const gulp = require('gulp');
const del = require('del');
const $ = require('gulp-load-plugins')({
	pattern: ['gulp-*', 'gulp.*'],
	replaceString: /\bgulp[\-.]/
});

const sass = require('gulp-sass');
sass.compiler = require('sass'); //Dart Sassを指定

const fibers = require('fibers');

const cleanCSS = require('gulp-clean-css');

const mozjpeg = require('imagemin-mozjpeg');
const pngquant = require('imagemin-pngquant');

const webpackStream = require('webpack-stream');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');

const browser = require('browser-sync');

const paths = {
	pug     : ['src/pug/**/*.pug', '!src/pug/**/_*.pug', '!src/pug/**/_**/*.pug'],
	sass    : ['src/sass/**/*.scss', '!src/sass/**/_*.scss', '!src/sass/_**/*.scss'],
	image   : ['src/img/**/*.{svg,gif,png,jpg,jpeg}'],
	favicon : ['src/favicon/**/*'],
	js      : ['src/js/**/*.js', '!src/js/**/_*.js', '!src/js/_**/*.js'],
	public  : 'public'
};

gulp.task('pug', () => {
	return gulp.src(paths.pug)
		.pipe($.plumber())
		.pipe($.pug({
			pretty: '\t'
		}))
		.pipe(gulp.dest(paths.public))
		.pipe(browser.reload({
			stream: true
		}));
});

gulp.task('sass', () => {
	return gulp.src(paths.sass)
		.pipe(sass().on('error', sass.logError))
		.pipe(sass({
			fiber: fibers,
			outputStyle: 'expanded'
		}))
		.pipe($.autoprefixer({
			cascade: false
		}))
		.pipe($.csscomb())
		// .pipe(cleanCSS())
		.pipe(gulp.dest(paths.public + '/assets/css'))
		.pipe(browser.reload({
			stream: true
		}));
});

gulp.task('image', () => {
	return gulp.src(paths.image)
		.pipe($.changed(paths.public))
		.pipe(
			$.imagemin([
				mozjpeg({
					quality: 80
				}),
				pngquant()
			])
		)
		.pipe(gulp.dest(paths.public + '/assets/img'));
});

gulp.task('webp', () => {
	return gulp.src(paths.image)
		.pipe($.changed(paths.public))
		.pipe($.webp())
		.pipe(gulp.dest(paths.public + '/assets/img'));
});

gulp.task('favicon', () => {
	return gulp.src(paths.favicon)
		.pipe($.changed(paths.public))
		.pipe(gulp.dest(paths.public));
});

gulp.task('bundle', () => {
	return webpackStream(webpackConfig, webpack)
		.pipe(gulp.dest(paths.public + '/assets/js'));
});

gulp.task('server', () => {
	return browser({
		online: true,
		open: 'external',
		server: {
			baseDir: 'public/',
		},
		port: 3100,
		// startPath: 'dummy/'
	});
});

gulp.task('html-reload', () => {
	return browser.reload();
});

gulp.task('clean', () => {
	return del(paths.public);
});

gulp.task('watch', () => {
	gulp.watch(['src/pug/**/*.pug'], gulp.task('pug'));
	gulp.watch(['src/sass/**/*.scss'], gulp.task('sass'));
	gulp.watch(['src/img/**/*'], gulp.task('image'));
	gulp.watch(['src/img/**/*'], gulp.task('webp'));
	gulp.watch(['src/js/**/*.js'], gulp.task('bundle'));
	gulp.watch(['src/favicon/**/*'], gulp.task('favicon'));
	gulp.watch('*html', gulp.task('html-reload'));
});

gulp.task(
	'build',
	gulp.series(
		gulp.parallel(
			'pug',
			'sass',
			'image',
			'webp',
			'favicon',
			'bundle',
		),
	),
);

gulp.task('default', gulp.series(gulp.parallel('server', 'watch')));