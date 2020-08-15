/**
 * For local development
 */
if (typeof $env === "undefined" || $env === null) {
  global._isApiTest = true;
  require("../lib/simulator");
}

/**
 * Feel free to explore, or check out the full documentation
 * https://docs.newrelic.com/docs/synthetics/new-relic-synthetics/scripting-monitors/writing-api-tests
 * for details.
 */

var assert = require("assert");

$http.post(
  "http://httpbin.org/post",
  // Post data
  {
    json: {
      widgetType: "gear",
      widgetCount: 10
    }
  },
  // Callback
  function(err, response, body) {
    assert.equal(response.statusCode, 200, "Expected a 200 OK response");

    console.log("Response:", body.json);
    assert.equal(body.json.widgetType, "gear", "Expected a gear widget type");
    assert.equal(body.json.widgetCount, 10, "Expected 10 widgets");
  }
);
