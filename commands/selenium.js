var path = require('path');

module.exports = {
  name: 'selenium',
  description: 'Runs the provided selenium script.',

  availableOptions: [
    { name: 'build', type: Boolean, default: true },
    { name: 'script', type: String, default: 'selenium.js' },
    { name: 'environment', type: String, default: 'production', aliases: ['e',{'dev' : 'development'}, {'prod' : 'production'}] },
    { name: 'output-path', type: String, default: 'selenium-dist' }
  ],

  runCommand: function() {
    var cwd = this.project.root;
    var script = require(path.join(cwd, this.commandOptions.script));
    var chromedriver = require('chromedriver');
    var webdriver = require('selenium-webdriver');
    var chrome = require('selenium-webdriver/chrome');
    var firefox = require('selenium-webdriver/firefox');

    process.env.PATH = process.env.PATH + path.delimiter + path.dirname(chromedriver.path);

    return script({
      webdriver: webdriver,
      chrome: chrome,
      firefox: firefox
    });
  },

  triggerBuild: function(commandOptions) {
    var BuildTask = this.tasks.Build;
    var buildTask = new BuildTask({
      ui: this.ui,
      analytics: this.analytics,
      project: this.project
    });

    return buildTask.run(commandOptions);
  },

  run: function(options, args) {
    var _this = this;
    this.commandOptions = options;

    if (options.build) {
      return this.triggerBuild(options)
        .then(function() {
          return _this.runCommand();
        });
    } else {
      return this.runCommand();
    }
  }
};
