import Ember from 'ember';
import { test } from 'qunit';
import moduleForAcceptance from 'super-rentals/tests/helpers/module-for-acceptance';

let StubMapsService = Ember.Service.extend({
  getMapElement() {
    return document.createElement('div');
  }
});

moduleForAcceptance('Acceptance | list rentals', {
  beforeEach() {
    this.application.register('service:stubMaps', StubMapsService);
    this.application.inject('component:location-map', 'maps', 'service:stubMaps');
  }
});

test('should list available rentals.', function (assert) {
  visit('/');
  andThen(function () {
    assert.equal(this.$('.listing').length, 3, "should see 3 listings");
  });
});

test('should link to information about the company.', function (assert) {
  visit('/');
  click('a:contains("About")');
  andThen(function () {
    assert.equal(currentURL(), '/about', "should navigate to about");
  });
});

test('should link to contact information', function (assert) {
  visit('/');
  click('a:contains("Contact")');
  andThen(function () {
    assert.equal(currentURL(), '/contact', "should navigate to contact");
  });
});


test('should list 1 rental when filtering by Seattle', function (assert) {
  visit('/');
  fillIn('.list-filter input', 'seattle');
  keyEvent('.list-filter input', 'keyup', 69);
  andThen(function () {
    assert.equal(this.$('.listing').length, 1, "should show 1 listing");
    assert.equal(this.$(".listing .location:contains('Seattle')").length, 1, "should contain 1 listing with location Seattle");
  });
});
