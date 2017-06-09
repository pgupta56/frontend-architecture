/*
 |--------------------------------------------------------------------------
 | Build configuration file
 |--------------------------------------------------------------------------
 |
 | Manages file paths, plugin settings and other build related settings.
 | Also makes sure some magic strings are filtered from the build.
 |
 */

var base = {
		dest: '../dist',
		src: './src',
		root: './'
	},
	/**
	 * Lookup table with task names
	 * @type {Object}
	 */
	taskNames = {
		clean: 'clean',
		css: 'css',
		font: 'font',
		img: 'img',
		js: 'js',
		template: 'template',
		watch: 'watch'
	};

module.exports = {
	base: base,
	css: {
		path: {
			dest: base.dest + '/css',
			main: base.src + '/css/main.scss',
			src: base.src + '/css/**/*.scss'
		}
	},
	font: {
		path: {
			dest: base.dest + '/font',
			src: base.src + '/font/**/*'
		}
	},
	js: {
		path: {
			dest: base.dest + '/js',
			destFile: base.dest + '/js/main.js',
			main: 'main.js',
			src: base.src + '/js/**/*.js'
		}
	},
	img: {
		path: {
			dest: base.dest + '/img',
			src: base.src + '/img/**/*.{svg,png,jpg,jpeg,gif}'
		}
	},
	taskNames: taskNames,
	template: {
		path: {
			dest: base.dest + '/template',
			src: base.src + '/template/**/*.mustache'
		}
	},
	params: {
		eslint: {
			configFile: base.root + '/.eslintrc'
		},
		rename: {
			suffix: '.min'
		},
		autoprefixer: {
			browsers: ['last 1 version', '> 5%']
		},
		requirejs: {
			baseUrl: base.src + '/js',
			generateSourceMaps: false,
			include: ['include'],
			insertRequire: ['include'],
			mainConfigFile: base.src + '/js/require.config.js',
			name: '../vendor/almond/almond',
			optimize: 'none',
			out: 'main.js',
			preserveLicenseComments: false
		}
	}
};
