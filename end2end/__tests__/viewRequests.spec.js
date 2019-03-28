import 'chromedriver';
import assert from 'assert';
import { Builder, By, until} from 'selenium-webdriver';

require('dotenv').config();
const { APP_URL, VALID_EMAIL, VALID_PASS } = process.env;

describe('View Requests Test', () => {
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

  it('logs a user in directly to the view-requests page', async () => {
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

  it('displays logged-in user\'s requests on the requests table', async () => {
    await driver.wait(until.elementLocated(By.id('request-1')), 10000);
    

    const product = await driver.findElement(By.css('#request-1 #product-type')).getText();
    const requestType = await driver.findElement(By.css('#request-1 #request-type')).getText();
    const requestStatus = await driver.findElement(By.css('#request-1 #product-status')).getText();

    await driver.sleep(3000);
    assert.equal(product, 'laptop');
    assert.equal(requestType, 'repair');
    assert.equal(requestStatus, 'pending');
  });
});
