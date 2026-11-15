import { cp, mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const config = JSON.parse(await readFile(path.join(root, 'config.json'), 'utf8'));

if (typeof config.appName !== 'string' || !config.appName.trim()) {
  throw new Error('config.json debe incluir un appName no vacío.');
}

const appIdPattern = /^[a-zA-Z][a-zA-Z0-9_]*(\.[a-zA-Z][a-zA-Z0-9_]*)+$/;
if (typeof config.appId !== 'string' || !appIdPattern.test(config.appId)) {
  throw new Error('config.json debe incluir un appId válido, por ejemplo com.empresa.miapp.');
}

const webDir = path.join(root, 'www');
await mkdir(webDir, { recursive: true });
for (const filename of ['index.html', 'style.css', 'app.js', 'config.json']) {
  await cp(path.join(root, filename), path.join(webDir, filename));
}

const capacitorConfig = {
  appId: config.appId,
  appName: config.appName.trim(),
  webDir: 'www'
};

await writeFile(
  path.join(root, 'capacitor.config.json'),
  `${JSON.stringify(capacitorConfig, null, 2)}\n`,
  'utf8'
);

console.log(`Aplicación preparada: ${capacitorConfig.appName} (${capacitorConfig.appId})`);
