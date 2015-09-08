import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../../tests/helpers/start-app';

module('Acceptance | uses service', {
  beforeEach: function() {
    this.application = startApp();
  },

  afterEach: function() {
    Ember.run(this.application, 'destroy');
  }
});

test('visiting /uses-service', function(assert) {
  visit('/uses-service');

  andThen(function() {
    assert.equal(currentURL(), '/uses-service');
  });
});
