module.exports = function cleanTask(gulp, plugins, config) {
	'use strict';

	return gulp.task(
		config.taskNames.clean,
		plugins.cleaner(config.base.dest)
	);
};
