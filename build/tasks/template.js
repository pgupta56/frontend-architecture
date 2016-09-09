module.exports = function task(gulp, plugins, config) {
	var path = config.template.path;

	/**
	 * Run the CSS build
	 */
	function build() {
		return gulp
				.src(path.src)
				// Save the optimized files
				.pipe(gulp.dest(path.dest));
	}

	plugins.taskManager.addTask('template', path.src, path.dest, build);
};
