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

// Fake chrome 72 browser
options.addArguments(
  '--user-agent="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36 "'
);

// Open devtools
// options.addArguments(
//   '--auto-open-devtools-for-tabs'
// )

// incognito
// options.AddArgument("incognito");
var capabilities = {
  browserName: "chrome",
  loggingPrefs: {
    driver: "DEBUG",
    browser: "DEBUG"
  }
};

var browser = new driver.Builder()
  .forBrowser("chrome")
  .withCapabilities(capabilities)
  .setChromeOptions(options)
  .build();

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

browser.addHeaders = function(headersMap) {
  console.log("$browser.addHeaders() NOT implemented");
  console.log("Update simulator.js to set the userAgent");
};

browser.addHeader = function(headerKey, headerValue) {
  console.log("$browser.addHeader() NOT implemented");
  console.log("Update simulator.js to set the userAgent");
};

browser.getCurrentUrl = function() {
  console.log("$browser.getCurrentUrl() NOT implemented");
};

module.exports = function() {
  this.$driver = driver;
  this.$browser = browser;
  this.$util = util;
  this.$env = env;
  this.$http = http;
};
