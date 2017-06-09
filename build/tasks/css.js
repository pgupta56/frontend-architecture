module.exports = function task(gulp, plugins, config) {
	var path = config.css.path,
		postCssOptions = [
			plugins.autoprefixer(config.params.autoprefixer.browsers)
		],
		taskName = config.taskNames.css,
		glob = '**/*.css';

	/**
	 * Run the CSS build
	 *
	 * Will create the following files for us:
	 * - A compiled CSS file from our SASS entry point
	 * - A minified variant of this above mentioned CSS file
	 * - Source maps to be able to navigate our code
	 */
	function build() {
		var normal = gulp.src(path.src)
			// Build the sass
			.pipe(plugins.sass().on('error', plugins.sass.logError))
			// Run any PostCSS actions
			// autoprefixer in our case
			.pipe(plugins.postcss(postCssOptions))
			// Filter CSS files from the stream
			.pipe(plugins.filter(glob))
			// Write CSS files and source map files
			.pipe(gulp.dest(path.dest));

		var minified = gulp.src(path.src)
			// Build the sass
			.pipe(plugins.sass().on('error', plugins.sass.logError))
			// Run any PostCSS actions
			// autoprefixer in our case
			.pipe(plugins.postcss(postCssOptions))
			// Filter CSS files from the stream
			.pipe(plugins.filter(glob))
			// Minify these CSS files
			// creating a second,
			// minified variant of our compiled file
			.pipe(plugins.cleanCss(
				{ debug: true },
				function cleanCss(details) {
					console.log('original css size: ' + details.name + ' ' + details.stats.originalSize);
					console.log('minified css size: ' + details.name + ' ' + details.stats.minifiedSize);
				}
			))
			// Rename these CSS files to .min.css
			.pipe(plugins.rename(config.params.rename))
			// Write minified files
			.pipe(gulp.dest(path.dest));

		return (normal, minified);
	}

	plugins.taskManager.addTask(taskName, path.src, path.dest, build);
};
