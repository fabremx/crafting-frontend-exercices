// cucumber.js
let common = [
    'src/bdd-tests/features/**/*.feature',                // Specify our feature files
    '--require-module ts-node/register',    // Load TypeScript module
    '--require src/bdd-tests/step-definitions/**/*.ts',   // Load step definitions
    '--format progress-bar',                // Load custom formatter
    '--format node_modules/cucumber-pretty', // Load custom formatter
    '--publish-quiet' // Load custom formatter
].join(' ');

module.exports = {
    default: common
};