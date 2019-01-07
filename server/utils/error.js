const util = require('util');

exports.JsonError = JsonError;
exports.PageError = PageError;

function noAuthError(message) {
    Error.call(this, message);
}
util.inherits(JsonError, Error);

function noLoginError(message) {
    Error.call(this, message);
}
util.inherits(PageError, Error);
