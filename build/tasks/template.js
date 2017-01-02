module.exports = function task(gulp, plugins, config) {
	'use strict';

	var path = config.template.path,
		taskName = config.taskNames.template;

	/**
	 * Run the CSS build
	 */
	function build() {
		return gulp
				.src(path.src)
				// Save the optimized files
				.pipe(gulp.dest(path.dest));
	}

	plugins.taskManager.addTask(taskName, path.src, path.dest, build);
};
