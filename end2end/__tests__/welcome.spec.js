require('chromedriver');
// const { getRandomMail } = require('../helpers/randomMail');
const assert = require('assert');
const { Builder, By, until} = require('selenium-webdriver');

require('dotenv').config();
const { APP_URL } = process.env;

describe('Maintenance-Tracker Home page', () => {
  let driver;
  before(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });
  after(async () => {
    await driver.sleep(3000);
    driver && driver.quit();
  });

  it('Launches the Maintenance-Tracker App Landing page', async () => {
    await driver.get(APP_URL);
    const title = await driver.getTitle();

    const signupBtnText = await driver.findElement(By.css('.btn-signup')).getText();

    assert.equal(title, 'MTracker | Welcome');
    assert.equal(signupBtnText, 'Get Started');
  });
});
