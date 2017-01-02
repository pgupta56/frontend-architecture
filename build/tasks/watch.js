module.exports = function watchTask(gulp, plugins, config) {
	'use strict';

	return gulp.task(
		config.taskNames.watch,
		plugins.taskManager.getWatchTasks()
	);
};
