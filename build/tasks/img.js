module.exports = function task(gulp, plugins, config) {
	'use strict';

	var path = config.img.path;

	/**
	 * Run the CSS build
	 */
	function build() {
		return gulp
				.src(path.src)
				// Find the files that are changed since our last build
				.pipe(plugins.changed(path.dest))
				// Run imagemin to smush these files to save space
				.pipe(plugins.imagemin())
				// Save the optimized files
				.pipe(gulp.dest(path.dest));
	}

	plugins.taskManager.addTask('img', path.src, path.dest, build);
};
