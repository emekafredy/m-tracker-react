import 'chromedriver';
import assert from 'assert';
import { Builder, By, until} from 'selenium-webdriver';

require('dotenv').config();
const { APP_URL, VALID_EMAIL, VALID_PASS } = process.env;

describe('View Request Details Test', () => {
  let driver, loginBtn;
  before(async () => {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.get(APP_URL);
    loginBtn = await driver.findElement(By.id('loginLink'));
    await loginBtn.click();
  });
  after(async () => {
    await driver.sleep(3000);
    driver && driver.quit();
  });

  it('logs a user in to view a request\'s details', async () => {
    await driver.findElement(By.id('email')).sendKeys(VALID_EMAIL);
    await driver.findElement(By.id('password')).sendKeys(VALID_PASS);

    const submitLogin = await driver.findElement(By.id('submit'));
    await submitLogin.click();
    await driver.wait(until.elementLocated(By.id('request-2')), 10000); 
    await driver.findElement(By.css('#request-2 #product-details')).click();
    await driver.wait(until.elementLocated(By.id('main-request-details')), 10000);

    const requestId = await driver.findElement(By.css('#request-id span')).getText();
    await driver.sleep(3000);
    assert.equal(requestId, '2');
  });

  it('successfuly updates the issue description for a request', async () => {
    await driver.findElement(By.css('#request-update')).click();
    await driver.wait(until.elementLocated(By.id('issueDescription')), 10000);
    
    await driver.findElement(By.css('#issueDescription')).clear();
    await driver.sleep(3000);
    await driver.findElement(By.css('#issueDescription')).sendKeys('Both the speaker and the earpiece does not function properly');

    await driver.findElement(By.css('#update-request')).click();
      
    await driver.wait(until.elementLocated(By.id('main-request-details')), 10000);

    const requestId = await driver.findElement(By.css('#request-id span')).getText();
    const issueDescription = await driver.findElement(By.css('#issue-description span')).getText();

    await driver.sleep(3000);
    assert.equal(requestId, '2');
    assert.equal(issueDescription, 'Both the speaker and the earpiece does not function properly');
  });
});
