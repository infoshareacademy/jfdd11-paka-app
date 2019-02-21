var Generator = require("yeoman-generator");

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts);

        this.argument("path", {
            type: String,
            required: true,
            desc: "Path to the component"
        });
    }

    writing() {
        const path = this.options.path;
        const appPath = 'src/components'

        const name = path.split('/').slice(-1)

        this.fs.copyTpl(
            this.templatePath("index.txt"),
            this.destinationPath(`${appPath}/${path}/index.js`),
            { name }
        );

        this.fs.copyTpl(
            this.templatePath("component.txt"),
            this.destinationPath(`${appPath}/${path}/${name}.js`),
            { name }
        );

        this.fs.copyTpl(
            this.templatePath("styles.txt"),
            this.destinationPath(`${appPath}/${path}/${name}.css`),
            { name }
        );
    }
}