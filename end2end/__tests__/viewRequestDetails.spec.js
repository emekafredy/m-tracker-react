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

  it('logs a user in directly to the requests page', async () => {
    await driver.findElement(By.id('email')).sendKeys(VALID_EMAIL);
    await driver.findElement(By.id('password')).sendKeys(VALID_PASS);

    const submitLogin = await driver.findElement(By.id('submit'));
    await submitLogin.click();

    await driver.wait(until.elementLocated(By.css('.role')), 10000);
    await driver.wait(until.elementLocated(By.id('status-message')), 10000);

    const userFirstName = await driver.findElement(By.css('.role')).getText();
    const requestsTableMessage = await driver.findElement(By.id('status-message')).getText();

    assert.equal(userFirstName, 'Tomiwa');
    assert.equal(requestsTableMessage, 'Requests successfully retrieved');
  });

  it('displays a logged-in user\'s request details when the details icon for the request is clicked', async () => {
    await driver.wait(until.elementLocated(By.id('request-1')), 10000); 
    await driver.findElement(By.css('#request-1 #product-details')).click();
    await driver.wait(until.elementLocated(By.id('main-request-details')), 10000); 

    const requestId = await driver.findElement(By.css('#request-id span')).getText();
    const product = await driver.findElement(By.css('#product-type span')).getText();
    const requestDate = await driver.findElement(By.css('#request-date span')).getText();
    const requestType = await driver.findElement(By.css('#request-type span')).getText();
    const issueDescription = await driver.findElement(By.css('#issue-description span')).getText();
    const requestStatus = await driver.findElement(By.css('#request-status span')).getText();

    await driver.sleep(3000);
    assert.equal(requestId, '1');
    assert.equal(product, 'laptop');
    assert.equal(requestDate, 'May 29th 2018, 5:11:58 am');
    assert.equal(requestType, 'repair');
    assert.equal(issueDescription, 'It shuts down on its own');
    assert.equal(requestStatus, 'pending');
  });
});
