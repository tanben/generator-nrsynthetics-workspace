# generator-nrsynthetics-workspace 

[![NPM](https://img.shields.io/badge/dynamic/json?color=orange&label=NPM&query=engines.npm&url=https%3A%2F%2Fraw.githubusercontent.com%2Ftanben%2Fgenerator-nrsynthetics-workspace%2Fmaster%2Fpackage.json)]() [![Version](https://img.shields.io/badge/dynamic/json?color=brightgreen&label=Version&query=version&url=https%3A%2F%2Fraw.githubusercontent.com%2Ftanben%2Fgenerator-nrsynthetics-workspace%2Fmaster%2Fpackage.json)](https://github.com/tanben/generator-nrsynthetics-workspace) [![License](https://img.shields.io/badge/dynamic/json?label=License&query=license&url=https%3A%2F%2Fraw.githubusercontent.com%2Ftanben%2Fgenerator-nrsynthetics-workspace%2Fmaster%2Fpackage.json)](https://github.com/tanben/generator-nrsynthetics-workspace) [![SynthTemplateVersion](https://img.shields.io/badge/dynamic/json?color=blue&label=SyntheticsTemplate&query=version&url=https%3A%2F%2Fraw.githubusercontent.com%2Ftanben%2Fgenerator-nrsynthetics-workspace%2Fmaster%2Fgenerators%2Fapp%2Ftemplates%2F_package.json
)](https://github.com/tanben/generator-nrsynthetics-workspace/blob/master/generators/app/templates/_package.json)



### Generate local workspace for creating/testing NR Synthetics ScriptedBrowse and API Tests.


## Installation

First, install [Yeoman](http://yeoman.io) and generator-nrsynthetics-workspace using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g @tanben/generator-nrsynthetics-workspace
```

Then generate your new project:

```bash

yo @tanben/nrsynthetics-workspace

```


# Generating a NR Synthetics workspace

1. Run `yo @tanben/nrsynthetics-workspace` from commandline

2. Select `Yes` when prompted `? Enable Download/Upload of Synthetics scripts to your account?`

3. Enter your Admin API Key when prompted `? Enter your admin Api Key`

```
This generator can also be run with: yo @tanben/nrsynthetics-workspace


     _-----_     ╭──────────────────────────╮
    |       |    │      Welcome to the      │
    |--(o)--|    │   bedazzling Synthetics  │
   `---------´   │        generator!        │
    ( _´U`_ )    ╰──────────────────────────╯
    /___A___\   /
     |  ~  |     
   __'.___.'__   
 ´   `  |° ´ Y ` 

? Enable Download/Upload of Synthetics scripts to your account? Yes
? Enter your admin Api Key NRAA-XXXXXXXXXXXXXXXXXXXXXXXXXXX

```
A workspace is created called `synthetics-local`,  the admin key will be stored in `.nrconfig.json`.


## Download / Upload monitor
**Note:**  This option is only avaiabable if you opted answered `Yes` to 
```
? Enable Download/Upload of Synthetics scripts to your account? Y

````
### Download and Upload Monitor
1. Change directory into `synthetics-local` directory.
2. Download monitor by running this command: `npm run download` to upload `npm run upload`
3. You will be presented with a list for Scripted Browser and API test.
   You can select single or multiple monitors or select `ALL`.

```
> npm run download

Using apiKey: "XXXX-XXXXXXXXXXXXXXXXXXXXXXXXX"
? Select Monitors (Press <space> to select, <a> to toggle all, <i> to invert selection)
❯ ◯ ALL
   = Scripted Browsers = 
  ◯ scriptedBrowser-test1
  ◯ scriptedBrowser-test2
   = API Tests = 
  ◯ apiTest-test1
  ◯ apiTest-test2

``` 
Files are downloaded to `./monitors` directory including the monitor configuration are saved in `nr-monitor.json`. 
NOTE: Do not rename the file or update the configuration file.


## Running  script locally

Add this to the top of your script, the library mimcs the Synthetics API and implements most common commands in Synthetics.

```

    if (typeof $env === "undefined" || $env === null) {
      global._isApiTest = true;  // false, for Scripted Browser
      require("../lib/simulator");
    }
```
Open a terminal, and change directory to `./monitors` 
```
node <filename>.js
```


Or from VSCode : Open your script and hit **F5**.

## Directory
```
./synthetics-local
|
|── .vscode
|    ├── launch.json
|
├── apps
│   ├── downloadConfig.js
│   ├── downloadScripts.js
│   ├── listLocalScripts.js
│   └── uploadScripts.js
|
├── examples
│   ├── apiTest.js
│   └── scriptedBrowser.js
├── lib
│   ├── simulator.js  // mock New Relic Synthetics implicit objects
|
├── LICENSE
├── monitors            // created after downloading a monitor
│   ├── nr-monitor.json // holds the account monitor configurations
│   └── scriptedBrowser-test1.js // downloaded script
|
├── package.json
└── package-lock.json

```



## License

Apache-2.0 © [Benedicto Tan](https://github.com/tanben)
