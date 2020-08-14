// @ts-check
/**
 *
 * Upload Synthetics Monitor Scripts
 *
 */
const inquirer = require("inquirer");

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

  const monitors = sclient.listMonitors();
  if (monitors.length === 0) {
    console.log(colorize.orange("no monitors found."));
    return;
  }

  let { names } = await prompt(monitors);

  if (names.includes("ALL")) {
    if (names.length > 1) {
      names.shift();
    } else {
      names = monitors.reduce((acc, curr) => {
        acc = [...acc, curr.name];
        return acc;
      }, []);
    }
  }

  await sclient.uploadScripts(names);
})().then(
  _ => {
    console.log(`Upload ${colorize.green("Complete")}`);
  },
  err => {
    console.log(`Upload ${colorize.red("Failed")}`);
    console.log(err);
  }
);

async function prompt(monitors) {
  const browserMonitors = monitors.filter(
    ({ type }) => type === "SCRIPT_BROWSER"
  );
  const apiMonitors = monitors.filter(({ type }) => type === "SCRIPT_API");

  return inquirer.prompt([
    {
      type: "checkbox",
      message: "Select Monitors",
      name: "names",
      loop: false,

      choices: _ => {
        const choices = [];
        choices.push({
          name: "ALL"
        });
        if (browserMonitors.length > 0) {
          choices.push(new inquirer.Separator(" = Scripted Browsers = "));
          browserMonitors.forEach(({ name }) => {
            choices.push({ name });
          });
        }

        if (apiMonitors.length > 0) {
          choices.push(new inquirer.Separator(" = API Tests = "));
          apiMonitors.forEach(({ name }) => {
            choices.push({ name });
          });
        }

        return choices;
      },
      validate: function(answer) {
        if (answer.length === 0) {
          return "You must choose at least one";
        }

        return true;
      }
    }
  ]);
}
