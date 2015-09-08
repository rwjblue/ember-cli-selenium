import { moduleFor, test } from 'ember-qunit';

moduleFor('service:selenium/recorder', {

});

test('can get a value when performance is available', function(assert) {
  let service = this.subject({
    performance: {
      now() {
        assert.ok(true, 'this.performance.now was called');
        return 123456789;
      }
    }
  });

  let result = service.getTime();

  assert.equal(result, 123456789, 'result of performance.now() is returned');
});

test('can get a value when performance is not available', function(assert) {
  let service = this.subject({
    performance: null,

    Date: {
      now() {
        assert.ok(true, 'this.Date.now was called');
        return 123456789;
      }
    }
  });

  let result = service.getTime();

  assert.equal(result, 123456789, 'result of Date.now() is returned');
});
