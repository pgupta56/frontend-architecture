module.exports = function task(gulp, plugins, config) {
	'use strict';

	var path = config.font.path,
		taskName = config.taskNames.font;

	/**
	 * Run the CSS build
	 */
	function build() {
		return gulp
				.src(path.src)
				.pipe(gulp.dest(path.dest));
	}

	plugins.taskManager.addTask(taskName, path.src, path.dest, build);
};
