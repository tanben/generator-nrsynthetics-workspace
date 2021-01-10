// @ts-check
/**
 *
 * Download Synthetics Monitor Configuration
 *
 */
const chalk = require("chalk");
const colorize = {
  red: chalk.bold.red,
  orange: chalk.keyword("orange"),
  green: chalk.keyword("green"),
  grey: chalk.keyword("grey")
};

const synthClient = require("@tanben/nr-synthetics-client");
const { apiKey } = require("../.nrconfig.json");

console.log(`Using apiKey: ${colorize.orange(JSON.stringify(apiKey))}`);

(async function() {
  const sclient = synthClient({
    apiKey
  });

  // Get monitors and save to local
  const response = await sclient.getAllMonitors({
    saveConfig: true
  });

  const { count } = response;
  console.log(`Total scripts ${colorize.orange(count)}`);
})().then(
  _ => {
    console.log(`Download ${colorize.green("Complete")}`);
  },
  err => {
    console.log(`Download ${colorize.red("Failed")}`);
    console.log(err);
  }
);
