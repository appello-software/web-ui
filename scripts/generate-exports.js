import 'zx/globals';

const writeExports = async (source) => {
  const files = await fs.readdir(source, { withFileTypes: true });
  const components = files.map(dirent => dirent.name.split('.')[0]).filter(name => name !== 'index');

  await fs.rm(`${source}/index.ts`, { force: true });
  await fs.appendFile(
    `${source}/index.ts`,
    components.map(folder => `export * from './${folder}';`).join('\n') + '\n'
  );
}

void async function () {
  await writeExports('src/components/common');
  await writeExports('src/components/form');
  await writeExports('src/components');
  await writeExports('src/hooks');
}();
