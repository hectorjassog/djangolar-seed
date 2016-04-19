//Protractor not recognised by JShint
/*global
 browser: false,
 */

'use strict';
describe('To Do', function() {
  
  beforeEach(function() {
    browser.get('http://localhost:9000');
  });

  it('should have a title', function() {
    expect(browser.getTitle()).toEqual('Djangolar');
  });

});
