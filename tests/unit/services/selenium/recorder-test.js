import { moduleFor, test } from 'ember-qunit';

moduleFor('service:selenium/recorder', {

});

test('exists', function(assert) {
  let service = this.subject();

  assert.ok(!!service, 'service exists and can be looked up from app/');
});
