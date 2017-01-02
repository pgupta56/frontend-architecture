module.exports = function javascriptTask(gulp, plugins, config) {
	'use strict';

	var path = config.js.path,
		taskName = config.taskNames.js,
		lintTask = 'js:lint',
		buildTask = 'js:build';

	/**
	 * Run the JavaScript build
	 *
	 * Creates the following files from our source files:
	 * - A bundled JavaScript file
	 * - The minified version of this above mentioned bundle
	 * - Source maps to be able to navigate the bundle properly
	 */
	function build(taskDone) {
		gulp.src(path.main)
			// Pipe it through plumber to resolve errors
			.pipe(plugins.plumber())
			// Use rjs to bundle AMD modules
			.pipe(plugins.requirejsOptimize(config.params.requirejs))
			// Write JS bundle file
			.pipe(gulp.dest(path.dest))
				// Minify this JS file
				.pipe(plugins.uglify())
				// Rename minified JS file to .min.js
				.pipe(plugins.rename(config.params.rename))
				// Write files to destination
				.pipe(gulp.dest(path.dest))
				.on('end', taskDone);
	}

	gulp.task(buildTask, build);

	/**
	 * Lint all JavaScript source files
	 */
	function lint() {
		gulp.src(path.src)
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
	function task() {
		plugins.runSequence(
			lintTask,
			buildTask
		);
	}

	plugins.taskManager.addTask(taskName, path.src, path.dest, task);
};
