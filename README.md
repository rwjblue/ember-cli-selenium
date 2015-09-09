# ember-cli-selenium

A simple integration of Selenium into an ember-cli command.

## Quick Start

Running:

```
ember selenium --script=scripts/search-for-webdriver.js
```

And having:

```
// scripts/search-for-webdriver.js

module.exports = function(options) {
  var webdriver = options.webdriver;
  var chrome = options.chrome;
  var until = webdriver.until;

  var chromeOptions = new chrome.Options();
  chromeOptions.addArguments(['--incognito']);

  var driver = new webdriver.Builder()
        .forBrowser('chrome')
        .setChromeOptions(
          new chrome.Options()
            .addArguments('--incognito')
        )
        .build();

  driver.get('https://www.google.com');

  var input = driver.findElement({ name: 'q'});

  input.sendKeys('webdriver');
  input.submit();

  driver.wait(until.titleIs('webdriver - Google Search'), 1000);
  driver.wait(until.elementLocated( { partialLinkText: 'Selenium' }));
  driver.findElement({ partialLinkText: 'Selenium' }).click();

  driver.getTitle()
    .then(function(title) {
      console.log('final title is: ' + title);
    });

  return driver.quit();
};
```

Will:

* launch an incognito Chrome window
* navigate to google.com
* search for `webdriver`
* click the first link that has the text "Selenium"
* `console.log` the title of the resulting page

## Selenium Script Arguments

The script is expected to return a function, that gets an options hash
with these items:

* `webdriver` - the result of `require('selenium-webdriver')`
* `chrome` - the result of `require('selenium-webdriver/chrome')`
* `firefox` - the result of `require('selenium-webdriver/firefox')`

The script should return a promise that resolves when the script is
complete (typically `return driver.quit();` is all you will need).

## Working on the Addon Itself

### Installation

* `git clone` this repository
* `npm install`
* `bower install`

### Running

* `ember server`
* Visit your app at http://localhost:4200.

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
