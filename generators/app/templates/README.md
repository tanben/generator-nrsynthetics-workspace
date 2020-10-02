
# New Relic Synthetics workspace
[![Node](https://img.shields.io/badge/dynamic/json?color=important&label=Node&query=engines.node&url=https%3A%2F%2Fraw.githubusercontent.com%2Ftanben%2Fgenerator-nrsynthetics-workspace%2Fmaster%2Fgenerators%2Fapp%2Ftemplates%2F_package.json)]()   [![SynthTemplateVersion](https://img.shields.io/badge/dynamic/json?color=blue&label=Version&query=version&url=https%3A%2F%2Fraw.githubusercontent.com%2Ftanben%2Fgenerator-nrsynthetics-workspace%2Fmaster%2Fgenerators%2Fapp%2Ftemplates%2F_package.json)](https://github.com/tanben/generator-nrsynthetics-workspace/blob/master/generators/app/templates/_package.json) [![License](https://img.shields.io/badge/dynamic/json?label=License&query=license&url=https%3A%2F%2Fraw.githubusercontent.com%2Ftanben%2Fgenerator-nrsynthetics-workspace%2Fmaster%2Fpackage.json)](https://github.com/tanben/generator-nrsynthetics-workspace)


### Generate New Relic Synthetics workspace for local development, for **Scripted Browsers and API tests**.
## Requirementes
* [Node.js/NPM](https://www.npmjs.com/get-npm)
* [Chrome Browser](https://www.google.com/chrome/)
* [Git CLI](https://git-scm.com/downloads). This generator can automatically setup a local; Git, repo for you.


#### Files
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
#### Verify local repo

```
btan@local:~//synthetics-local$ git status
On branch master

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	.editorconfig
	.gitignore
	.vscode/
	LICENSE
	README.md
	apps/
	examples/
	lib/
	monitors/
	package-lock.json
	package.json
```
**Note:** The admin key is stored in `.nrconfig.json` and is not commited see `.gitignore`


## Download / Upload monitor
**Note:**  This option is only avaiabable if you opted  `Yes`  to **Enable Download/Upload of Synthetics scripts.**


1. Change directory into `synthetics-local` .
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
Files are downloaded to `./monitors` directory which also includes the Synthetics monitor configurations for your arccount, these are saved in `nr-monitor.json`.

**NOTE:**  Do not rename the monitor file name(s) or update the configuration file.


## Running  script locally

1. Add this to the top of your script, the library mimcs the Synthetics API and implements most common commands in Synthetics.

> It's important that `global._isApiTest` is set to `false`, for scripted browser tests.

```

    if (typeof $env === "undefined" || $env === null) {
      global._isApiTest = true;  // false, for Scripted Browser
      require("../lib/simulator");
    }
```
2. Execute the script by hitting *F5* from VScode or open a terminal, run `node <filename>.js` in the `./monitors`  directory.
```
monitors>  node <filename>.js
```


## Running Examples
### API Test
Open the file examples/apiTest.js and `F5` to execute.

Go to troubleshooting section if you received an error:
> Can't find Node.js binary "node": path does not exist. Make sure Node.js is installed and in your PATH, or set the "runtimeExecutable" in your launch.json

```
btan@local:~/synthetics-local$ node examples/apiTest.js
Response: { widgetCount: 10, widgetType: 'gear' }

```
### Scripted Browser
Open the file examples/apiTest.js and `F5` to execute.

Go to troubleshooting section if you received an error:
> Can't find Node.js binary "node": path does not exist. Make sure Node.js is installed and in your PATH, or set the "runtimeExecutable" in your launch.json

```
btan@local:~/synthetics-local$ node examples/scriptedBrowser.js

```
Browser opens
![image](./images/scriptedBrowser.png)


## Troubelshooting
### Error Message

#### TypeError: $browser.get is not a function. When running scripted browsers.
> Make sure that you've set:  `global._isApiTest = false`

#### Can't find Node.js binary "node": path does not exist. Make sure Node.js is installed and in your PATH, or set the "runtimeExecutable" in your launch.json

> Edit the file `.vscode/launch.json` , and add the "runtimeExecutable" property with the Node path:
```
      "runtimeExecutable": "<Node binary absolute path>",
```
Example:
```
  {
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Launch Program",
      "skipFiles": ["<node_internals>/**"],
      "runtimeExecutable": "/Users/btan/.nvm/versions/node/v12.13.0/bin/node",
      "program": "${file}"
    }
  ]
}
```
## License

Apache-2.0
