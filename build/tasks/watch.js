module.exports = function watchTask(gulp, plugins, config) {
    return gulp.task(
        'watch',
        plugins.taskManager.getWatchTasks()
    );
};
