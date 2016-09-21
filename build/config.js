/**
 * Build configuration file
 */
var base = {
	dest: '../dist',
	src: './src',
	root: './'
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
			main: base.src + '/js/include.js',
			src: base.src + '/js/**/*.js'
		}
	},
	img: {
		path: {
			dest: base.dest + '/img',
			src: base.src + '/img/**/*.{svg,png,jpg,jpeg,gif}'
		}
	},
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
