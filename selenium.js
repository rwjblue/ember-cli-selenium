module.exports = function(options) {
  var webdriver = options.webdriver;
  var chrome = options.chrome;
  var By = webdriver.By;
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
