module.exports = function javascriptTask(gulp, plugins, config) {
	var path = config.js.path,
		taskName = config.taskNames.js,
		lintTask = 'js:lint',
		buildTask = 'js:build',
		buildProductionTask = buildTask + ':production';

	/**
	 * Run the JavaScript build for production
	 *
	 * Picks up the already built JS file
	 * And applies some required computations to make it production ready.
	 */
	function buildProduction(taskDone) {
		gulp.src(path.destFile)
			// Strip any code that is only applicable on DEV
			.pipe(plugins.stripCode(config.params.stripCode))
			// Minify this JS file
			.pipe(plugins.uglify())
			// And rename them to .min.js
			.pipe(plugins.rename(config.params.rename))
			// Write the minified file to this destination aswell
			.pipe(gulp.dest(path.dest))
			.on('end', taskDone);
	}

	gulp.task(buildProductionTask, buildProduction);

	/**
	 * Run the JavaScript build
	 *
	 * Creates the following files from our source files:
	 * - A bundled JavaScript file
	 * - The minified version of this above mentioned bundle
	 * - Source maps to be able to navigate the bundle properly
	 */
	function build(taskDone) {
		// Initialize browserify
		plugins.browserify(config.params.browserify)
			// Make sure we babelify to create ES5 code from ES6 code
			.transform(plugins.babelify, config.params.babelify)
			// Bundle the entire dependency tree together
			.bundle()
			.on('error', console.log)
			// We need to get a vinyl source stream
			// since gulp works with streams, otherwise we can't
			// use our other packages
			.pipe(plugins.vinylSourceStream(path.main))
			.pipe(plugins.vinylBuffer())
			// Initialize source maps
			.pipe(plugins.sourcemaps.init())
			// Write sourcemaps for this file
			.pipe(plugins.sourcemaps.write('.'))
			// Write the minified file to this destination aswell
			.pipe(gulp.dest(path.dest))
			.on('end', taskDone);
	}

	gulp.task(buildTask, build);

	/**
	 * Lint all JavaScript source files
	 */
	function lint() {
		return gulp.src(path.src)
			// eslint() attaches the lint output to the "eslint" property
			// of the file object so it can be used by other modules.
			.pipe(plugins.eslint(config.params.eslint))
			// eslint.format() outputs the lint results to the console.
			// Alternatively use eslint.formatEach() (see Docs).
			.pipe(plugins.eslint.formatEach());
	}

	gulp.task(lintTask, lint);

	/**
	 * Combine all JavaScript tasks as the main task
	 */
	function task(callback) {
		// We run the build task before the lint task. This has the benefit of
		// not having to wait for the linter before the JS is build and you can
		// refresh the site in your browser. This saves on average about 5s of
		// waiting per build.
		plugins.runSequence(
			buildTask,
			lintTask,
			buildProductionTask,
			callback
		);
	}

	plugins.taskManager.addTask(taskName, path.src, path.dest, task);
};
