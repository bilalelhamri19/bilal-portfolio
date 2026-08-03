const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const logFile = path.resolve(__dirname, 'INSTALL_LOG.txt');
let log = [];

function logMsg(s) {
  log.push(String(s));
  console.log(s);
}

const npmCli = "C:\\Program Files\\nodejs\\node_modules\\npm\\bin\\npm-cli.js";
const pdfjsPkg = 'pdfjs-dist@3.11.174';

logMsg('=== START === ' + new Date().toISOString());
logMsg('NPM CLI exists: ' + fs.existsSync(npmCli));
logMsg('CWD: ' + __dirname);

try {
  logMsg('\n=== Spawning npm install... ===');
  const result = spawnSync('node', [npmCli, 'install', pdfjsPkg, '--no-save', '--cache', path.resolve(__dirname, '.npm-cache')], {
    cwd: __dirname,
    timeout: 180000,
    maxBuffer: 10 * 1024 * 1024
  });
  
  logMsg('Exit code: ' + result.status);
  logMsg('Signal: ' + result.signal);
  if (result.stdout) logMsg('STDOUT: ' + result.stdout.toString('utf8').slice(-2000));
  if (result.stderr) logMsg('STDERR: ' + result.stderr.toString('utf8').slice(-2000));
  if (result.error) logMsg('ERROR: ' + result.error.message + '\n' + result.error.stack);
} catch (e) {
  logMsg('EXCEPTION: ' + e.message + '\n' + e.stack);
}

const nmPath = path.resolve(__dirname, 'node_modules');
const pdfjsPath1 = path.resolve(nmPath, 'pdfjs-dist');
logMsg('\nnode_modules exists: ' + fs.existsSync(nmPath));
logMsg('pdfjs-dist exists: ' + fs.existsSync(pdfjsPath1));

if (fs.existsSync(pdfjsPath1)) {
  try {
    logMsg('\n=== pdfjs-dist contents ===');
    const contents = fs.readdirSync(pdfjsPath1);
    logMsg('Items: ' + contents.join(', '));
    const pkg = JSON.parse(fs.readFileSync(path.join(pdfjsPath1, 'package.json'), 'utf8'));
    logMsg('Package name: ' + pkg.name);
    logMsg('Package version: ' + pkg.version);
    logMsg('Main: ' + pkg.main);
    
    const mainPath = path.resolve(pdfjsPath1, pkg.main || 'build/pdf.js');
    logMsg('\nTrying to load: ' + mainPath);
    logMsg('Main exists: ' + fs.existsSync(mainPath));
    
    if (fs.existsSync(mainPath)) {
      logMsg('\n=== LOADING PDFJS ===');
      const pdfjsLib = require(mainPath);
      const workerPath = path.resolve(pdfjsPath1, 'build', 'pdf.worker.js');
      logMsg('Worker exists: ' + fs.existsSync(workerPath));
      if (fs.existsSync(workerPath)) {
        pdfjsLib.GlobalWorkerOptions.workerSrc = workerPath;
      }
      
      const pdfPath = path.resolve(__dirname, 'cv elhamri bilal.pdf');
      logMsg('PDF: ' + pdfPath);
      logMsg('PDF size: ' + fs.statSync(pdfPath).size);
      
      const data = new Uint8Array(fs.readFileSync(pdfPath));
      
      logMsg('\n=== PARSING PDF === (async)');
      
      (async () => {
        try {
          const loadingTask = pdfjsLib.getDocument({ data });
          const pdf = await loadingTask.promise;
          logMsg('Num pages: ' + pdf.numPages);
          
          let full = '';
          for (let i = 1; i <= pdf.numPages; i++) {
            logMsg('Page ' + i);
            const page = await pdf.getPage(i);
            full += '=== PAGE ' + i + ' ===\n';
            const tc = await page.getTextContent();
            const its = tc.items.map(it => it.str).join('\n');
            full += its + '\n\n';
          }
          
          const out = path.resolve(__dirname, 'pdf_extracted_text.txt');
          fs.writeFileSync(out, full, 'utf8');
          logMsg('\n=== DONE! ===');
          logMsg('Written: ' + out + ' (' + full.length + ' chars)');
          logMsg('\n=== FULL TEXT ===\n');
          logMsg(full);
          
          fs.writeFileSync(logFile, log.join('\n'), 'utf8');
          process.exit(0);
        } catch (e) {
          logMsg('ASYNC ERROR: ' + e.message + '\n' + e.stack);
          fs.writeFileSync(logFile, log.join('\n'), 'utf8');
          process.exit(1);
        }
      })();
      
      setTimeout(() => {
        logMsg('TIMEOUT - waited too long');
        fs.writeFileSync(logFile, log.join('\n'), 'utf8');
        process.exit(2);
      }, 60000);
      
      return;
      
    }
  } catch (e) {
    logMsg('Load error: ' + e.message + '\n' + e.stack);
  }
} else {
  logMsg('\n=== Trying local packages ===');
  const existingPkgs = [
    'next', 'react', 'three', 'recharts', 'lenis', 'gsap', 'three-stdlib',
    '@react-three/fiber', '@react-three/drei'
  ];
  for (const p of existingPkgs) {
    try {
      const resolved = require.resolve(p);
      logMsg(p + ': ' + resolved);
    } catch (e) {
      logMsg(p + ': NOT FOUND');
    }
  }
}

fs.writeFileSync(logFile, log.join('\n'), 'utf8');
logMsg('\n=== END (sync) ===');
