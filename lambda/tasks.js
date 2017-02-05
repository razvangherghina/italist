var lambdaToolkit = require('aws-lambda-toolkit');


if (process.argv[process.argv.length - 1] === 'publish') {
    // If using .awscredentials.json file
    lambdaToolkit.deploy({
      publish: true
    });
}

if (process.argv[process.argv.length - 1] === 'test') {
    lambdaToolkit.test();
}