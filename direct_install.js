const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const npmCli = "C:\\Program Files\\nodejs\\node_modules\\npm\\bin\\npm-cli.js";

console.log('NPM CLI exists:', fs.existsSync(npmCli));
console.log('Current dir:', __dirname);
console.log('Files in dir before install:');
console.log(fs.readdirSync(__dirname).filter(f => !f.startsWith('.')).join(', '));

console.log('\n=== Running npm install ===');
const result = spawnSync('node', [npmCli, 'install', 'pdfjs-dist@3.11.174', '--no-save', '--verbose'], {
  cwd: __dirname,
  encoding: 'utf8',
  timeout: 180000,
  env: { ...process.env, npm_config_loglevel: 'verbose' }
});

console.log('\nExit code:', result.status);
console.log('Signal:', result.signal);
console.log('\n=== STDOUT (last 3000 chars) ===');
console.log(result.stdout ? result.stdout.slice(-3000) : '(empty)');
console.log('\n=== STDERR (last 3000 chars) ===');
console.log(result.stderr ? result.stderr.slice(-3000) : '(empty)');
console.log('\n=== Error ===');
console.log(result.error ? result.error.message : '(none)');

console.log('\nFiles in dir after install:');
try {
  console.log(fs.readdirSync(__dirname).filter(f => !f.startsWith('.')).join(', '));
} catch(e) { console.log(e.message); }

const nm = path.join(__dirname, 'node_modules');
console.log('\nnode_modules exists:', fs.existsSync(nm));
if (fs.existsSync(nm)) {
  try {
    const contents = fs.readdirSync(nm);
    console.log('node_modules contents:', contents.slice(0, 30).join(', '));
    console.log('Total items:', contents.length);
  } catch(e) { console.log('Error reading node_modules:', e.message); }
}
