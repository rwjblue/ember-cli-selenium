/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-cli-selenium',

  includedCommands: function() {
    return {
      'selenium': require('./commands/selenium')
    };
  },
};
