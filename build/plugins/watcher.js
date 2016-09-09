/**
 * Watch a specific set of files
 * and run a task when they change
 */
var gulp = require('gulp'),
    watch = require('gulp-watch');

module.exports = function watchTask(files, task) {
    return function watcher(cb) {
        /**
         * Run the task provided
         * and make sure the callback is in order
         */
        function runTask() {
            return gulp.start([task], cb);
        }

        watch(files, runTask);
    };
};
