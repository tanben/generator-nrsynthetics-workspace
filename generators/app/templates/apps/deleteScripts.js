//@ts-check
/**
 * 
 * Delete Synthetics Monitor Scripts
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
    const response = await smgr.getAllMonitors({
        saveConfig: true
    });

    const { count, monitors } = response;
    let { names } = await prompt(monitors);

    if (names.includes('ALL') && names.length ==1) {
        await smgr.deleteScripts(monitors);
    } else {
        let monitorSelection = [];
        for (let i=0, name=names[i]; i < names.length; name=names[++i] ){
            monitorSelection= [...monitorSelection, ...monitors.filter( monitor=>(monitor.name == name))];
        }

        await smgr.deleteScripts(monitorSelection);
    }

})()
.then( _=> {
    console.log(`Delete ${colorize.green("Complete")}` );
}, err=>{
    console.log(`Delete ${colorize.red("Failed")}` );
    console.log(err);
});


async function prompt(monitors) {
    const browserMonitors = monitors.filter(({
        type
    }) => type === "SCRIPT_BROWSER");
    const apiMonitors = monitors.filter(({
        type
    }) => type === "SCRIPT_API");

    return await inquirer.prompt([{
        type: "checkbox",
        message: "Select Monitors",
        name: "names",
        loop: false,

        choices: (_) => {
            const choices = [];
            choices.push({
                name: "ALL"
            });
            if (browserMonitors.length > 0) {
                choices.push(new inquirer.Separator(" = Scripted Browsers = "));
                browserMonitors.forEach(({
                    name
                }) => {
                    choices.push({name});
                });
            }

            if (apiMonitors.length > 0) {
                choices.push(new inquirer.Separator(" = API Tests = "));
                apiMonitors.forEach(({
                    name
                }) => {
                    choices.push({name});
                });
            }

            return choices;
        },
        validate: function (answer) {
            if (answer.length == 0) {
                return "You must choose at least one";
            }
            return true;
        },
    }, ]);
}