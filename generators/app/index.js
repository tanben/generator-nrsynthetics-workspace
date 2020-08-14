"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
const path = require("path");
const makeDir = require("make-dir");

module.exports = class extends Generator {
  constructor(...args) {
    super(...args);
    this.props = {
      projectName: "synthetics-local",
      adminApiKey: ""
    };
  }

  _promptAPIKey() {
    const prompts = [
      {
        type: "confirm",
        name: "enableRemoteConnection",
        message:
          "Enable Download/Upload of Synthetics scripts to your account?",
        default: false
      },
      {
        type: "input",
        name: "adminApiKey",
        message: "Enter your admin Api Key",
        when: resp => resp.enableRemoteConnection
      }
    ];

    return this.prompt(prompts).then(props => {
      Object.assign(this.props, props);
      return props;
    });
  }

  prompting() {
    this.log(
      yosay(`Welcome to the bedazzling ${chalk.red("Synthetics")} generator!`)
    );
    return this._promptAPIKey();
  }

  configuring() {
    if (path.basename(this.destinationRoot()) !== this.props.projectName) {
      return makeDir(this.props.projectName).then(path => {
        this.destinationRoot(path);
        this.log(chalk`\nGenerating a new project in {green ${path}}\n`);
      });
    }
  }

  writing() {
    let copyList = [
      {
        source: this.templatePath("README.md"),
        target: this.destinationPath("README.md")
      },
      {
        source: this.templatePath("_editorconfig"),
        target: this.destinationPath(".editorconfig")
      },
      {
        source: this.templatePath("_gitignore"),
        target: this.destinationPath(".gitignore")
      },
      {
        source: this.templatePath("_npmrc"),
        target: this.destinationPath(".npmrc")
      },
      {
        source: this.templatePath("_package.json"),
        target: this.destinationPath("package.json")
      },
      { source: this.templatePath("lib"), target: this.destinationPath("lib") },
      {
        source: this.templatePath("examples"),
        target: this.destinationPath("examples")
      },
      {
        source: this.templatePath("_vscode"),
        target: this.destinationPath(".vscode")
      },
      {
        source: this.templatePath("LICENSE"),
        target: this.destinationPath("LICENSE")
      }
    ];

    if (this.props.enableRemoteConnection) {
      const extendedConfig = [
        {
          source: this.templatePath("apps"),
          target: this.destinationPath("apps")
        },
        {
          source: this.templatePath("_nrconfig.json"),
          target: this.destinationPath(".nrconfig.json")
        },
        {
          source: this.templatePath("_nrconfig.json"),
          target: this.destinationPath(".nrconfig.json.tmpl")
        }
      ];

      copyList = [...copyList, ...extendedConfig];
    }

    copyList.forEach(({ source, target }) => {
      this.fs.copyTpl(source, target, this.props);
    });
  }

  install() {
    this.installDependencies({
      npm: true,
      bower: false,
      yarn: false,
      skipMessage: true
    });
  }

  async end() {
    this._createGit();
  }

  _createGit() {
    this.spawnCommandSync("git", ["init", "--quiet"], {
      cwd: this.destinationPath()
    });
  }
};
