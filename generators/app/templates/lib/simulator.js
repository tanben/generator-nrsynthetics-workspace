// Synthetics Simulator

require("chromedriver");
const chrome = require("selenium-webdriver/chrome");
const driver = require("selenium-webdriver");
const http = require("request");

const util = {
  insights: {
    set: function() {
      console.log(`util.insights.set(): not supported ignoring.`);
    },
    get: function() {
      console.log(`util.insights.get(): not supported ignoring.`);
    },
    getKeys: function() {
      console.log(`util.insights.getKeys(): not supported ignoring.`);
    },
    has: function() {
      console.log(`util.insights.has(): not supported ignoring.`);
    },
    unset: function() {
      console.log(`util.insights.unset(): not supported ignoring.`);
    },
    unsetAll: function() {
      console.log(`util.insights.unsetAll(): not supported ignoring.`);
    }
  }
};
const env = {
  JOB_ID: -1,
  MONITOR_TYPE: "",
  API_VERSION: "",
  LOCATION: "",
  PROXY_HOST: "",
  PROXY_PORT: 80
};
///
// chrome capabilities
// https://chromedriver.chromium.org/capabilities
//
// switches
// https://chromium.googlesource.com/chromium/src/+/master/chrome/common/chrome_switches.cc
//
// preferences
// https://chromium.googlesource.com/chromium/src/+/master/chrome/common/pref_names.cc
var options = new chrome.Options();

//! Set User-agent chrome 72 browser
options.addArguments(
  'user-agent="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36 "'
);

//! Open devtools
// options.addArguments(
//   'auto-open-devtools-for-tabs'
// )

//! incognito
// options.AddArgument("incognito");


//! Set headless mode
// options.addArguments("headless");
// options.addArguments("no-sandbox");
// options.addArguments("window-size=1200,1100");


var capabilities = {
  browserName: "chrome",
  loggingPrefs: {
    driver: "DEBUG",
    browser: "DEBUG"
  }
};

let browser = {};
if (typeof global._isApiTest === "undefined" || global._isApiTest === false) {
  browser = new driver.Builder()
    .forBrowser("chrome")
    .withCapabilities(capabilities)
    .setChromeOptions(options)
    .build();
}

browser.waitForElement = function(locatorOrElement, timeoutMsOpt) {
  return browser.wait(
    driver.until.elementLocated(locatorOrElement),
    timeoutMsOpt || 1000,
    "Timed-out waiting for element to be located using: " + locatorOrElement
  );
};

browser.waitForAndFindElement = function(locatorOrElement, timeoutMsOpt) {
  return this.waitForElement(locatorOrElement, timeoutMsOpt).then(function(
    element
  ) {
    return browser
      .wait(
        driver.until.elementIsVisible(element),
        timeoutMsOpt || 1000,
        "Timed-out waiting for element to be visible using: " + locatorOrElement
      )
      .then(function() {
        return element;
      });
  });
};

browser.waitForPendingRequests = timeout => {
  return new Promise(resolve => {
    setTimeout(resolve(true), timeout);
  });
};

browser.addHeaders = function() {
  console.log(`$browser.addHeaders(): not supported ignoring.`);
};

browser.addHeader = function() {
  console.log(`$browser.addHeader(): not supported ignoring.`);
};


browser.getCurrentUrl = function() {
  console.log("$browser.getCurrentUrl() NOT implemented");
};

global.$driver = driver;
global.$browser = browser;
global.$util = util;
global.$env = env;
global.$http = http;
