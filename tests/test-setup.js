const test = require('tape');
//needed to stop tests from hanging
test.onFinish(() => process.exit(0));

module.exports = test;
