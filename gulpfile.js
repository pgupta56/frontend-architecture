var _ = require('lodash'),
	buildFolder = './build',
	gulp = require('gulp'),
	/**
	 * Plugins that are used throughout the build process
	 */
	plugins = _.extend(
		// Every plugin that starts with "gulp-"
		require('gulp-load-plugins')(),
		{
			// Additional plugins not starting with "gulp-"
			autoprefixer: require('autoprefixer'),
			lodash: _,
			path: require('path'),
			runSequence: require('run-sequence'),
			// Internal project plugins
			cleaner: require(buildFolder + '/plugins/cleaner'),
			taskManager: require(buildFolder + '/plugins/task-manager'),
			watcher: require(buildFolder + '/plugins/watcher')
		}
	),
	config = require(buildFolder + '/config'),
	tasksFolder = '/tasks',
	/**
	 * Parameters being passed to every single task
	 * so they can be used inside without (re)referencing plugins
	 */
	taskParams = {
		gulp: gulp,
		plugins: plugins,
		config: config
	};

/**
 * Make sure to execute polyfill
 * since some packages use ES6 promises
 */
require('es6-promise').polyfill();

/**
 * Set params for every single task,
 * and require the entire task folder.
 *
 * Pretty much the same as require-dir,
 * but with parameter support.
 */
plugins.taskManager
	.setParams(taskParams)
	.requireFolder(buildFolder + tasksFolder);

/**
 * The default task
 */
gulp.task(
	'default',
	[
		'clean',
		'css',
		'font',
		'img',
		'js',
		'template'
	]
);

