var _ = require('lodash'),
	del = require('del');

/**
 * Clean a specified path
 */
module.exports = function cleaner(path) {
	return _.partial(del.sync, path, {
		force: true
	});
};
