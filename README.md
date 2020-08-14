# generator-nrsynthetics-workspace 
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> Generate local workspace for creating/testing NR Synthetics ScriptedBrowse and API Tests.

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
This generator can also be run with: yo synth-generator


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
A workspace is created called `synthetics-local`, the admin key will be stored in `.nrconfig.json`.

## Download / Upload monitor
1. Download monitor by running this command: `npm run download` to upload `npm run upload`
2. You will be presented with a list for Scripted Browser and API test.
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
    if (typeof $env === 'undefined'){
        require('../lib/simulator')();
    }

```
Open a terminal, and `cd ./monitors` 
```
node <filename>.js
```


Or from VSCode hit `F5`.

## Directory
```
./synthetics-local
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


[npm-image]: https://badge.fury.io/js/generator-nrsynthetics-workspace.svg
[npm-url]: https://npmjs.org/package/generator-nrsynthetics-workspace
[travis-image]: https://travis-ci.com/@tanben/generator-nrsynthetics-workspace.svg?branch=master
[travis-url]: https://travis-ci.com/@tanben/generator-nrsynthetics-workspace
[daviddm-image]: https://david-dm.org/@tanben/generator-nrsynthetics-workspace.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/@tanben/generator-nrsynthetics-workspace
