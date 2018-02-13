# scaffander
Code generator with support for structure templates

Example template for scaffander-cli can be found here: https://github.com/ikatun/scaffander-example

Example of usage as a library for code generator (from examples/ directory):
```
.
├── index.js
├── templates
|   └── test-template
|     ├── template-init.js
|     └── {{directoryName}}
|       └── {{myFileName}}.js
```

{{myFileName}}.js
```
export class {{className}} {
     constructor() {
       console.log('Thank you very much for constructing me!');
     }
   }
   
   export default {{className}};
```

template-init.js
```js
// don't worry, this file will not be part of the generated code :)

// called before template is parsed
// variables added to context here can be used within the template
exports.before = (context) => {
  context.directoryName = 'MyTestDirectory';
};

// called after template is parsed
// postRunActions can be added to the postRunActions array
// these are executed after user accepts the new diff
exports.after = (context) => {
  context.postRunActions.push(() => console.log("I'm all done, thanks for waiting!"));
  //you can also call scaffander() function here if you want to generate a template within another template 
};

```

index.js
```js
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

```

running the example (from the examples/scaffander-test directory)
```
npm install
node index.js test-template generated-template
# generated-template directory is created
```
