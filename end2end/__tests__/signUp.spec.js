import 'chromedriver';
import { getRandomMail } from '../helpers/randomMail';
import assert from 'assert';
import { Builder, By, until} from 'selenium-webdriver';

require('dotenv').config();
const { APP_URL, SIGNUP_PASS } = process.env;

describe('SignUp Test', () => {
  let driver, signupBtn;
  before(async () => {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.get(APP_URL);
    signupBtn = await driver.findElement(By.className('btn-signup'));
    await signupBtn.click();
  });
  after(async () => {
    await driver.sleep(3000);
    driver && driver.quit();
  });

  it('Throws an error when a required input value is missing', async () => {
    await driver.findElement(By.id('firstName')).sendKeys('');
    await driver.findElement(By.id('lastName')).sendKeys('Sammy');
    await driver.findElement(By.id('email')).sendKeys(getRandomMail());
    await driver.findElement(By.id('password')).sendKeys(SIGNUP_PASS);

    await driver.sleep(3000);
    const register = await driver.findElement(By.id('register'));
    await register.click();

    await driver.wait(until.elementLocated(By.id('firstNameError')), 10000);

    const firstNameErrMsg = await driver.findElement(By.id('firstNameError')).getText();

    await driver.sleep(3000);
    assert.equal(firstNameErrMsg, 'First name is required');
  });

  it('Throws an error when the email input ia not valid', async () => {
    await driver.findElement(By.id('firstName')).sendKeys('Emeka');
    await driver.findElement(By.id('lastName')).sendKeys('Chinedu');
    await driver.findElement(By.id('email')).clear();
    await driver.findElement(By.id('email')).sendKeys('notvalid.com');

    await driver.sleep(3000);
    const register = await driver.findElement(By.id('register'));
    await register.click();

    await driver.wait(until.elementLocated(By.id('emailError')), 10000);
    const emailErrMsg = await driver.findElement(By.id('emailError')).getText();

    await driver.sleep(3000);
    assert.equal(emailErrMsg, 'Your email is invalid');
  });

  it('Throws an error when the password has less than 6 characters', async () => {   
    await driver.findElement(By.id('email')).clear();
    await driver.findElement(By.id('email')).sendKeys(getRandomMail());
    await driver.findElement(By.id('password')).clear();
    await driver.findElement(By.id('password')).sendKeys('123');

    await driver.sleep(3000);
    const register = await driver.findElement(By.id('register'));
    await register.click();

    await driver.wait(until.elementLocated(By.id('passwordError')), 10000);
    const passwordErrMsg = await driver.findElement(By.id('passwordError')).getText();

    await driver.sleep(3000);
    assert.equal(passwordErrMsg, 'your Password length should be between 6 and 15');
  });

  it('successfully signs up a new user', async () => {
    await driver.findElement(By.id('firstName')).clear();
    await driver.findElement(By.id('firstName')).sendKeys('Emeka');
    await driver.findElement(By.id('lastName')).clear();
    await driver.findElement(By.id('lastName')).sendKeys('Chinedu');
    await driver.findElement(By.id('email')).clear();
    await driver.findElement(By.id('email')).sendKeys(getRandomMail());
    await driver.findElement(By.id('password')).clear();
    await driver.findElement(By.id('password')).sendKeys(SIGNUP_PASS);

    await driver.sleep(3000);
    const register = await driver.findElement(By.id('register'));
    await register.click();

    await driver.wait(until.elementLocated(By.css('.role')), 10000);
    await driver.wait(until.elementLocated(By.id('status-message')), 10000);

    const userFirstName = await driver.findElement(By.css('.role')).getText();
    const requestsTableMessage = await driver.findElement(By.id('status-message')).getText();

    await driver.sleep(3000);
    assert.equal(userFirstName, 'Emeka');
    assert.equal(requestsTableMessage, 'You have no requests record yet');
  });
});
