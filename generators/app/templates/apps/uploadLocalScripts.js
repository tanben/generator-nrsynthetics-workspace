//@ts-check
/**
 *
 * Upload Local Synthetics Monitor Scripts
 *
 */
const inquirer = require("inquirer");

const chalk = require("chalk");
const colorize = {
  red: chalk.bold.red,
  orange: chalk.keyword("orange"),
  green: chalk.keyword("green"),
  grey: chalk.keyword("grey"),
};

const synthClient = require("@tanben/nr-synthetics-client");
const { apiKey } = require("../.nrconfig.json");

console.log(`Using apiKey: ${colorize.orange(JSON.stringify(apiKey))}`);

(async function() {
  const smgr = synthClient({
    apiKey,
  });

  const monitors = await smgr.listLocalMonitors();
  if (monitors.length == 0) {
    console.log(colorize.orange("no local monitors found."));
    return;
  }

  const allLocations = await smgr.getAllLocations();

  let { names, type, frequency, status, locations } = await prompt(
    monitors,
    allLocations
  );

  if (names.includes("ALL")) {
    if (names.length > 1) {
      names.shift();
    } else {
      names = monitors.reduce((acc, curr) => (acc = [...acc, curr]), []);
    }
  }

  if (locations.includes("ALL")) {
    if (locations.length > 1) {
      locations.shift();
    } else {
      locations = allLocations.reduce(
        (acc, curr) => (acc = [...acc, curr.name]),
        []
      );
    }
  }

  await smgr.createScripts(names, type, frequency, status, locations);
})().then(
  (_) => {
    console.log(`Upload ${colorize.green("Complete")}`);
  },
  (err) => {
    console.log(`Upload ${colorize.red("Failed")}`);
    console.log(err);
  }
);

async function prompt(monitors, locations) {
  return await inquirer.prompt([
    {
      type: "checkbox",
      message: "Select Monitors to upload (create)",
      name: "names",
      loop: false,

      choices: (_) => {
        const choices = [];
        choices.push({
          name: "ALL",
        });
        if (monitors.length > 0) {
          monitors.forEach((monitor) => {
            choices.push({ name: monitor });
          });
        }

        return choices;
      },
      validate: function(answer) {
        if (answer.length == 0) {
          return "You must choose at least one";
        }
        return true;
      },
    },
    {
      type: "list",
      message: "What type of monitor? (Will be applied to monitors selected)",
      name: "type",
      loop: false,
      choices: ["Scripted API", "Scripted Browser"],
      validate: function(answer) {
        if (answer.length == 0) {
          return "You must choose at least one";
        }
        return true;
      },
      filter: function(answer) {
        if (answer === "Scripted API") {
          return "SCRIPT_API";
        }
        return "SCRIPT_BROWSER";
      },
    },
    {
      type: "list",
      message:
        "Select frequency (minutes) (Will be applied to monitors selected)",
      name: "frequency",
      loop: false,
      choices: [1, 5, 10, 15, 30, 60, 360, 720, 1440],
      validate: function(answer) {
        if (answer.length == 0) {
          return "You must choose at least one";
        }
        return true;
      },
    },
    {
      type: "list",
      message: "Select status (Will be applied to monitors selected)",
      name: "status",
      loop: false,
      choices: ["ENABLED", "MUTED", "DISABLED"],
      validate: function(answer) {
        if (answer.length == 0) {
          return "You must choose at least one";
        }
        return true;
      },
    },
    {
      type: "checkbox",
      message: "Select Locations (Will be applied to monitors selected)",
      name: "locations",
      loop: false,

      choices: (_) => {
        const choices = [];
        choices.push({
          name: "ALL",
        });
        if (locations.length > 0) {
          locations.forEach(({ name }) => {
            choices.push({ name });
          });
        }

        return choices;
      },
      validate: function(answer) {
        if (answer.length == 0) {
          return "You must choose at least one";
        }
        return true;
      },
    },
  ]);
}
