//@ts-check
/**
 * 
 * Update Synthetics Monitor Script Settings
 * 
 */
const inquirer = require("inquirer");

const chalk = require ('chalk');
const colorize={
    red:chalk.bold.red,
    orange: chalk.keyword('orange'),
    green: chalk.keyword('green'),
    grey: chalk.keyword('grey')
};


const synthClient = require("@tanben/nr-synthetics-client");
const { apiKey } = require("../.nrconfig.json");

console.log(`Using apiKey: ${colorize.orange(JSON.stringify(apiKey))}`);

(async function () {
    const smgr = synthClient({
        apiKey
    });

    // Get monitors and save to local
    const { monitors } = await smgr.getAllMonitors({
        saveConfig: true
    });
    const allLocations = await smgr.getAllLocations();

    let { names, frequency, status, locations } = await prompt(monitors, allLocations);

    let monitorSelection = [];
    if (names.includes('ALL') && names.length ==1) {
        monitorSelection = [...monitors];
    } else { 
        for (let i=0, name=names[i]; i < names.length; name=names[++i] ){
            monitorSelection= [...monitorSelection, ...monitors.filter( monitor=>(monitor.name == name))];
        }
    }

    if (locations.includes('ALL')) {
        if(locations.length >1){
            locations.shift();
        }else{
            locations = allLocations.reduce( (acc, curr)=>(acc=[...acc, curr.name]), [] );
        }
    }

    await smgr.updateSettings(monitorSelection, frequency, status, locations);
})()
.then( _=> {
    console.log(`Update Settings ${colorize.green("Complete")}` );
}, err=>{
    console.log(`Update Settings ${colorize.red("Failed")}` );
    console.log(err);
});


async function prompt(monitors, locations) {
    const browserMonitors = monitors.filter(({
        type
    }) => type === "SCRIPT_BROWSER");
    const apiMonitors = monitors.filter(({
        type
    }) => type === "SCRIPT_API");

    return await inquirer.prompt([
      {
        type: "checkbox",
        message: "Select Monitors to update",
        name: "names",
        loop: false,

        choices: (_) => {
          const choices = [];
          choices.push({
            name: "ALL",
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
          if (answer.length == 0) {
            return "You must choose at least one";
          }
          return true;
        },
      },
      {
        type: "list",
        message: "Select frequency (minutes) (Will be applied to monitors selected)",
        name: "frequency",
        loop: false,
        choices: [1, 5, 10, 15, 30, 60, 360, 720, 1440],
      },
      {
        type: "list",
        message: "Select status (Will be applied to monitors selected)",
        name: "status",
        loop: false,
        choices: ["ENABLED", "MUTED", "DISABLED"],
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
            locations.forEach(({name}) => {
              choices.push({name});
            });
          }

          return choices;
        },
      },
    ]);
}