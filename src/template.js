import path from 'path';
import fs, { pathExists } from 'fs-extra';
import Promise from 'bluebird';
import getOrSet from 'lodash-get-or-set';
import Mustache from 'mustache';
import { offerChanges } from './diff';

async function instantiateTemplatePathRec(templatePath, destinationPath, context, opts) {
  if (templatePath.endsWith('template-init.js')) {
    return null;
  }
  destinationPath = Mustache.render(destinationPath, context);

  const templatePathState = await fs.lstat(templatePath);
  getOrSet(context, 'diffLog', {});

  if (templatePathState.isDirectory()) {
    const files = await fs.readdir(templatePath);
    await Promise.map(files, file => {
      const src = path.join(templatePath, file);
      const dest = path.join(destinationPath, file);
      return instantiateTemplatePathRec(src, dest, context, opts);
    });
  } else if (templatePathState.isFile()) {
    const templateContent = await fs.readFile(templatePath, 'utf8');
    context.diffLog[destinationPath] = await Mustache.render(templateContent, context);
  }
}

function importName(modulePath, name, defaultValue) {
  try {
    return require(modulePath)[name] || defaultValue;
  } catch (err) {
    if (err.code === 'MODULE_NOT_FOUND') {
      return defaultValue;
    }
    throw err;
  }
}

async function instantiateTemplatePath(localTemplatePath, destinationPath, context, opts = {}) {
  opts.overwrite = opts.overwrite || (() => false);
  const postRunActions = getOrSet(context, 'postRunActions', []);

  const initPath = path.join(localTemplatePath, 'template-init');

  const before = importName(initPath, 'before', () => {});
  const after = importName(initPath, 'after', () => {});

  await before(context);
  await instantiateTemplatePathRec(localTemplatePath, destinationPath, context, opts);
  await after(context);

  const changes = {
    diffLog: context.diffLog || {},
    postRunActions,
    msg: opts.msg,
  };

  return await offerChanges(changes);
}

export default instantiateTemplatePath;
