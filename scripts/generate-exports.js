import 'zx/globals';

const writeExports = async (source) => {
  const files = await fs.readdir(source, { withFileTypes: true });
  const folders = files.filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  await fs.rm(`${source}/index.ts`, { force: true });
  await fs.appendFile(
    `${source}/index.ts`,
    folders.map(folder => `export * from './${folder}';`).join('\n') + '\n'
  );
}

void async function () {
  await writeExports('src/components/common');
  await writeExports('src/components/form');
  await writeExports('src/components');
}();
