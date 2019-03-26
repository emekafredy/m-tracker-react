import 'chromedriver';
import { getRandomMail } from '../helpers/randomMail';
import assert from 'assert';
import { Builder, By, until} from 'selenium-webdriver';

require('dotenv').config();
const { APP_URL, VALID_EMAIL, VALID_PASS } = process.env;

describe('Login Test', () => {
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

  it('throws an error when a required input value is missing', async () => { 
    await driver.findElement(By.id('email')).sendKeys('');
    await driver.findElement(By.id('password')).sendKeys(VALID_PASS);

    await driver.sleep(3000);
    const submitLogin = await driver.findElement(By.id('submit'));
    await submitLogin.click();

    await driver.wait(until.elementLocated(By.id('emailError')), 10000);

    const emailErrMsg = await driver.findElement(By.id('emailError')).getText();

    await driver.sleep(3000);
    assert.equal(emailErrMsg, 'Your email is required');
  });

  it('throws an error when incorrect login details are supplied', async () => {
    await driver.findElement(By.id('email')).sendKeys('notcorrect@mail.com');

    await driver.sleep(3000);
    const submitLogin = await driver.findElement(By.id('submit'));
    await submitLogin.click();

    await driver.wait(until.elementLocated(By.id('emailError')), 10000);
    const incorrectDetailsErrMsg = await driver.findElement(By.id('emailError')).getText();

    await driver.sleep(3000);
    assert.equal(incorrectDetailsErrMsg, 'Your email or password is incorrect');
  });

  it('successfully logs in a registered user', async () => {
    await driver.findElement(By.id('email')).clear();
    await driver.findElement(By.id('email')).sendKeys(VALID_EMAIL);
    await driver.findElement(By.id('password')).clear();
    await driver.findElement(By.id('password')).sendKeys(VALID_PASS);

    await driver.sleep(3000);
    const submitLogin = await driver.findElement(By.id('submit'));
    await submitLogin.click();

    await driver.wait(until.elementLocated(By.css('.role')), 10000);
    await driver.wait(until.elementLocated(By.id('status-message')), 10000);

    const userFirstName = await driver.findElement(By.css('.role')).getText();
    const requestsTableMessage = await driver.findElement(By.id('status-message')).getText();

    await driver.sleep(3000);
    assert.equal(userFirstName, 'Tomiwa');
    assert.equal(requestsTableMessage, 'Requests successfully retrieved');
  });
});
