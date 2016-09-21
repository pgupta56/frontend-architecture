module.exports = function cleanTask(gulp, plugins, config) {
	'use strict';

	return gulp.task(
		'clean',
		plugins.cleaner(config.base.dest)
	);
};
