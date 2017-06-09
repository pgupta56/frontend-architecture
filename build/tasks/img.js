module.exports = function task(gulp, plugins, config) {
	'use strict';

	var path = config.img.path,
		taskName = config.taskNames.img;

	/**
	 * Run the CSS build
	 */
	function build() {
		return gulp
				.src(path.src)
				// Just a regular copy
				.pipe(gulp.dest(path.dest));
	}

	plugins.taskManager.addTask(taskName, path.src, path.dest, build);
};
