module.exports = function task(gulp, plugins, config) {
	var path = config.js.path,
		lintTask = 'js:lint',
		buildTask = 'js:build',
		jsGlob = '**/*.js';

	/**
	 * Run the JavaScript build
	 *
	 * Creates the following files from our source files:
	 * - A bundled JavaScript file
	 * - The minified version of this above mentioned bundle
	 * - Source maps to be able to navigate the bundle properly
	 */
	function buildJs(taskDone) {
		gulp.src(path.main)
			// Pipe it through plumber to resolve errors
			.pipe(plugins.plumber())
			// Use rjs to bundle AMD modules
			.pipe(plugins.requirejsOptimize(config.params.requirejs))
			// Write minified files
			.pipe(gulp.dest(path.dest))
			// Initialize source maps
			.pipe(plugins.sourcemaps.init())
			// Write source maps
			.pipe(plugins.sourcemaps.write('.'))
			// Write CSS files and source map files
			.pipe(gulp.dest(path.dest))
				// Filter CSS files from the stream
				.pipe(plugins.filter(jsGlob))
				// Minify the filtered JS files
				.pipe(plugins.uglify())
				// Rename these JS files to .min.js
				.pipe(plugins.rename(config.params.rename))
				// Write minified files
				.pipe(gulp.dest(path.dest))
				.on('end', taskDone);
	}

	gulp.task(buildTask, buildJs);

	/**
	 * Lint all JavaScript source files
	 */
	function lintJs() {
		gulp.src(path.src)
			// eslint() attaches the lint output to the "eslint" property
			// of the file object so it can be used by other modules.
			.pipe(plugins.eslint(config.params.eslint))
			// eslint.format() outputs the lint results to the console.
			// Alternatively use eslint.formatEach() (see Docs).
			.pipe(plugins.eslint.formatEach());
	}

	gulp.task(lintTask, lintJs);

	/**
	 * Combine all JavaScript tasks as the main task
	 */
	function build() {
		plugins.runSequence(
			lintTask,
			buildTask
		);
	}

	plugins.taskManager.addTask('js', path.src, path.dest, build);
};
