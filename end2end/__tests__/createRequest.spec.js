import 'chromedriver';
import assert from 'assert';
import { Builder, By, until} from 'selenium-webdriver';

require('dotenv').config();
const { APP_URL, VALID_EMAIL, VALID_PASS } = process.env;

describe('Create Request Test', () => {
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

  it('logs in user', async () => {
    await driver.findElement(By.id('email')).sendKeys(VALID_EMAIL);
    await driver.findElement(By.id('password')).sendKeys(VALID_PASS);

    const submitLogin = await driver.findElement(By.id('submit'));
    await submitLogin.click();

    await driver.wait(until.elementLocated(By.css('.role')), 10000);

    const userFirstName = await driver.findElement(By.css('.role')).getText();

    assert.equal(userFirstName, 'Tomiwa');
  });

  it('throws an error when issue description is not filled', async () => {
    await driver.wait(until.elementLocated(By.id('createRequestBtn')), 10000);
    await driver.findElement(By.id('createRequestBtn')).click();

    await driver.wait(until.elementLocated(By.id('issueDescription')), 10000);
    await driver.findElement(By.id('issueDescription')).sendKeys('');

    await driver.sleep(3000);
    const createBtn = await driver.findElement(By.id('create-request'));
    await createBtn.click();

    await driver.wait(until.elementLocated(By.id('issuesError')), 10000);

    const issuesErrMsg = await driver.findElement(By.id('issuesError')).getText();

    await driver.sleep(3000);
    assert.equal(issuesErrMsg, 'Please describe the issue with your product');
  });

  it('succesfully creates a maintenance request', async () => {
    await driver.findElement(By.id('createRequestBtn')).click();
    await driver.findElement(By.id('issueDescription')).sendKeys('This product needs a little bit of maintenance');

    await driver.sleep(3000);
    const createBtn = await driver.findElement(By.id('create-request'));
    await createBtn.click();

    await driver.wait(until.elementLocated(By.id('status-message')), 10000);
    const requestsTableMessage = await driver.findElement(By.id('status-message')).getText();

    await driver.sleep(3000);
    assert.equal(requestsTableMessage, 'Requests successfully retrieved');
  });
});
