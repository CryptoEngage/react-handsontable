const JSDOMEnvironment = require('jest-environment-jsdom');

module.exports = class CustomJSDomEnvironment extends JSDOMEnvironment {
  constructor (config) {
    const _config = Object.assign(config, {
      testEnvironmentOptions: {
        beforeParse (window) {
          Number.prototype.toLowerCase = function() { return this + 'px'; };
          Number.prototype.split = function() { return this + 'px'; };
        }
      }});
    super(_config);
    this.global.jsdom = this.dom;
  }

  teardown () {
    this.global.jsdom = null;
    return super.teardown();
  }
};
