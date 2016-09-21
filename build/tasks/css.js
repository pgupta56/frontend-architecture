module.exports = function task(gulp, plugins, config) {
	'use strict';

	var path = config.css.path,
		postCssOptions = [
			plugins.autoprefixer(config.params.autoprefixer.browsers)
		],
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
		gulp.src(path.src)
			// Initialize source maps
			.pipe(plugins.sourcemaps.init())
			// Build the sass
			.pipe(plugins.sass().on('error', plugins.sass.logError))
			// Run any PostCSS actions
			// autoprefixer in our case
			.pipe(plugins.postcss(postCssOptions))
			// Write source maps
			.pipe(plugins.sourcemaps.write('.'))
			// Write CSS files and source map files
			.pipe(gulp.dest(path.dest))
				// Filter CSS files from the stream
				.pipe(plugins.filter(glob))
				// Minify these CSS files
				// creating a second,
				// minified variant of our compiled file
				.pipe(plugins.minifyCss())
				// Rename these CSS files to .min.css
				.pipe(plugins.rename(config.params.rename))
				// Write minified files
				.pipe(gulp.dest(path.dest));
	}

	plugins.taskManager.addTask('css', path.src, path.dest, build);
};
