/**
 * For local development
 */
if (typeof $env === "undefined" || $env === null) {
  require("../lib/simulator");
}

/**
 * Feel free to explore, or check out the full documentation
 * https://docs.newrelic.com/docs/synthetics/new-relic-synthetics/scripting-monitors/writing-scripted-browsers
 * for details.
 */

var assert = require("assert");

$browser
  .get("http://example.com")
  .then(function() {
    // Check the H1 title matches "Example Domain"
    return $browser.findElement($driver.By.css("h1")).then(function(element) {
      return element.getText().then(function(text) {
        assert.equal("Example Domain", text, "Page H1 title did not match");
      });
    });
  })
  .then(function() {
    // Check that the external link matches "https://www.iana.org/domains/example"
    return $browser
      .findElement($driver.By.css("div > p > a"))
      .then(function(element) {
        return element.getAttribute("href").then(function(link) {
          assert.equal(
            "https://www.iana.org/domains/example",
            link,
            "More information link did not match"
          );
        });
      });
  });
