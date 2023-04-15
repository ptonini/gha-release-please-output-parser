// Load .env file for local testing
require('dotenv-expand').expand(require('dotenv').config())

const core = require('@actions/core')

function main() {
    let packages = {}
    const releasePleaseOutputs = JSON.parse(core.getInput("release_please_outputs", { required: true }))
    JSON.parse(releasePleaseOutputs['paths_released']).forEach(path => {
        packages[path] = {
            package_name: path.split('/')[1],
            tag_name: releasePleaseOutputs[`${path}--tag_name`],
            version: releasePleaseOutputs[`${path}--version`],
        }
    })
    core.setOutput("packages", JSON.stringify(packages))
}

main()

