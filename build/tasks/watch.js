module.exports = function watchTask(gulp, plugins, config) {
	'use strict';

	return gulp.task(
		'watch',
		plugins.taskManager.getWatchTasks()
	);
};
