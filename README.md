# scaffander

Example of a code generator (from examples/)
```
.
├── index.js
├── templates
|   └── test-template
|     ├── template-init.js
|     └── {{directoryName}}
|       └── {{myFileName}}.js
```

template-init.js
```
export class {{className}} {
     constructor() {
       console.log('Thank you very much for constructing me!');
     }
   }
   
   export default {{className}};
```

index.js
```
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
