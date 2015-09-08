import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';

moduleFor('service:profiling', {

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

test('startTimer can be invoked', function(assert) {
  let service = this.subject({
    performance: {
      now() {
        assert.ok(true, 'this.performance.now was called');
        return 123456789;
      }
    }
  });

  assert.ok(service.startTimer, 'startTimer function exists');

  let result = service.startTimer('foo');
  let expected = { start: 123456789, end: null };

  assert.deepEqual(result, expected, 'object is returned');
});

test('stopTimer throws an error if startTimer was not invoked first', function(assert) {
  let service = this.subject();

  assert.throws(() => {
    service.stopTimer('foo');
  }, /You called `stopTimer` without having called `startTimer` first\./);
});

test('stopTimer can be invoked', function(assert) {
  let times = [1000, 2000];
  let timeIndex = -1;

  let service = this.subject({
    performance: {
      now() {
        timeIndex++;

        return times[timeIndex];
      }
    }
  });

  assert.ok(service.startTimer, 'startTimer function exists');

  service.startTimer('foo');
  let result = service.stopTimer('foo');

  let expected = { start: 1000, end: 2000 };

  assert.deepEqual(result, expected, 'object is returned');
});

test('profileRender starts a timer and schedules ending a timer in the afterRender queue', function(assert) {
  let timeToReturn = 1000;
  let result;

  let service = this.subject({
    getTime() {
      assert.ok(true, 'getTime was called');

      return timeToReturn;
    }
  });

  // start a run loop manually
  Ember.run.begin();

  result = service.profileRender('foo');

  assert.deepEqual(result, { start: 1000, end: null }, 'initial result is correct');

  // change the time to be returned by the next call to `getTime`
  timeToReturn = 2000;

  Ember.run.schedule('afterRender', () => {
    // this is to ensure that the timedRender scheduled a
    // getTime in afterRender, and it should be called *before*
    // this afterRender callback is invoked
    timeToReturn = 3000;
  });

  Ember.run.end();

  assert.deepEqual(result, { start: 1000, end: 2000 }, 'result is correct afterRender is complete');

  assert.equal(service.getTime(), 3000, 'confirm the little smoke and mirrors above actual did something...');
});
