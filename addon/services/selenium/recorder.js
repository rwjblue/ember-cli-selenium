import Ember from 'ember';

export default Ember.Service.extend({
  performance: performance, // jshint ignore:line
  Date: Date, // jshint ignore:line

  getTime() {
    if (this.performance && this.performance.now) {
      return this.performance.now();
    } else {
      return this.Date.now();
    }
  }
});
