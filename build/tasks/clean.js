module.exports = function cleanTask(gulp, plugins, config) {
    return gulp.task(
        'clean',
        plugins.cleaner(config.base.dest)
    );
};
