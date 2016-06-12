var gulp		= require('gulp');
var browserSync		= require('browser-sync');
var sass		= require('gulp-sass');
var sassGlob		= require('gulp-sass-glob');
var prefix		= require('gulp-autoprefixer');
var concat		= require('gulp-concat');
var uglify		= require('gulp-uglify');
var notify 		= require('gulp-notify');
var cp			= require('child_process');

var jekyll		= process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';
var messages		= {
	jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

/**
 * Handle errors with Gulp Notify
 */
function handleErrors() {
	var args = Array.prototype.slice.call(arguments);
	notify.onError({
		title: 'Compile Error',
		message: '<%= error.message %>'
	}).apply(this, args);
	this.emit('end'); // Keep gulp from hanging on this task
}

/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', function (done) {
	browserSync.notify(messages.jekyllBuild);
	return cp.spawn( jekyll , ['build'], {stdio: 'inherit'})
		.on('close', done);
});

/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
	browserSync.reload();
});

/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', ['sass', 'jekyll-build'], function() {
	browserSync({
		server: {
			baseDir: '_site'
		}
	});
});

/**
 * Compile files from _scss into both _site/css (for live injecting) and site (for future jekyll builds)
 */
gulp.task('sass', function () {
	return gulp.src('_sass/main.scss')
	    
		.pipe(sassGlob())
		.pipe(sass({
			includePaths: ['scss'],
			outputStyle: 'compressed',
		}))
		.on('error', handleErrors)
		.pipe(prefix(['last 3 versions', '> 1%'], { cascade: true }))
		.pipe(gulp.dest('_site/css'))
		.pipe(browserSync.reload({stream:true}))
		.pipe(gulp.dest('css'));
});

/**
 * Concat, minify and check errors on JS files
 */
gulp.task('scripts', function() {
  return gulp.src('_js/*.js')
	.pipe(concat('scripts.js'))
	.pipe(uglify())
	 .on('error', handleErrors)
	.pipe(gulp.dest('_site/js'))
	.pipe(browserSync.reload({stream:true}))
	.pipe(gulp.dest('js'));
});

/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function () {
	gulp.watch('_sass/**/*.scss', ['sass']);
	gulp.watch('_js/**/*.js', ['scripts']);
	gulp.watch(['*.html', '_layouts/*.html', '_posts/*'], ['jekyll-rebuild']);
});

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files & concat scripts.
 */
gulp.task('default', ['browser-sync', 'watch']);
