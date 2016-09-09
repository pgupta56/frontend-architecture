var _ = require('lodash'),
	api = {
		addTask: addTask,
		getWatchTasks: getWatchTasks,
		requireFolder: requireFolder,
		setParams: setParams
	},
	cleaner = require('./cleaner'),
	fs = require('fs'),
	gulp = require('gulp'),
	params = {},
	watcher = require('./watcher'),
	watchTasks = [];

/**
 * Set internal params to pass to each task
 */
function setParams(paramsToSet) {
	// Sets it to the local variable
	// since this process will only be needed once
	params = paramsToSet;

	return api;
}

/**
 * Bootstrap a task
 * only use this if you want a watcher and a task
 */
function addTask(name, src, dest, fn) {
	// Create a normal version of the task
	gulp.task(name, fn);
	// Create a watch version of the task
	// and use the watcher util to handle the action
	gulp.task('watch:' + name, watcher(src, name));
	// Create a clean version of the task
	// so you can individually clean folders
	gulp.task('clean:' + name, cleaner(dest));

	// Push it to the watchTask array
	// the watch task uses this array to determine
	// all tasks that need watching
	watchTasks.push('watch:' + name);

	return api;
}

/**
 * Get all tasks that need to be watched
 */
function getWatchTasks() {
	return watchTasks;
}

/**
 * Helper to load a specific task
 * assumes that the name of the file is the same name as the task
 */
function requireTask(task) {
	if(
		// Check all params that are needed
		!params.gulp ||
		!params.plugins ||
		!params.config
	) {
		// Error if they're not set
		console.error(
			'Task manager did not receive all 3 required params. ' +
			'Expected gulp, plugins & config'
		);

		return false;
	}

	// Require a task and pass in the params
	require(
		'../tasks/' + task
	)(
		params.gulp,
		params.plugins,
		params.config
	);

	return task;
}

/**
 * Helper to load a folder with tasks
 */
function requireFolder(folder) {
	var tasks = fs.readdirSync(folder);

	// Map over each task and require it with the params needed
	return _.map(tasks, requireTask);
}

module.exports = api;
