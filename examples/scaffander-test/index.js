const path = require('path');

const scaffander = require('scaffander').default;
// or better yet: import scaffander from 'scaffander';

const argv = process.argv;
if (argv.length !== 4) {
  console.log('usage: node index.js <templateName> <destinationPath>');
  process.exit(-1);
}
const templateName = argv[2];
const destinationPath = argv[3];

const context = { myFileName: 'index', className: 'MyBeautifulClass' };
const templatePath = path.join(__dirname, 'templates', templateName);
scaffander(templatePath, destinationPath, context, { msg: 'Do you want to apply these changes?' });
