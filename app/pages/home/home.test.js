
Feature('Home Page');

Scenario('Test the first h2 value', (I) => {
  I.amOnPage('/');
  I.dontSee("New value");
  I.see("Initial value", ".jumbotron > h2");
});


Scenario('Test the button', (I) => {
  I.amOnPage('/');
  I.click('Change sub header value');
  I.dontSee("First value");
  I.see("New value", ".jumbotron > h2");
});