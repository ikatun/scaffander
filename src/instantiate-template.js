import scaffander from './scaffander';
import minimist from 'minimist';

const argv = minimist(process.argv.slice(2));
const path = argv._[0];
if (!path || path.length > 1) {
  console.error('Usage: scaffander <template-dir> --key1 value1 --key2 value2 --key3 value3');
  console.error('Keys with values are passed as context and will replace mustache template variables');
  process.exit(-1);
}
