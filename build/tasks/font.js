module.exports = function task(gulp, plugins, config) {
	'use strict';

	var path = config.font.path;

	/**
	 * Run the CSS build
	 */
	function build() {
		return gulp
				.src(path.src)
				.pipe(gulp.dest(path.dest));
	}

	plugins.taskManager.addTask('font', path.src, path.dest, build);
};
