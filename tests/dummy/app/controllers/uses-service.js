import Ember from 'ember';

export default Ember.Controller.extend({
  recorder: Ember.inject.service('selenium/recorder')
});
