const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const pdfPath = path.resolve('cv elhamri bilal.pdf');
const outputPath = path.resolve('pdf_extracted_text.txt');

console.log('PDF exists:', fs.existsSync(pdfPath));
console.log('PDF size:', fs.statSync(pdfPath).size, 'bytes');

let pdfParse;
try {
  pdfParse = require('pdf-parse');
  console.log('pdf-parse already installed');
} catch (e) {
  console.log('Installing pdf-parse...');
  try {
    execSync('npm install pdf-parse --no-save', { stdio: 'inherit' });
    pdfParse = require('pdf-parse');
  } catch (installErr) {
    console.log('npm install failed, trying alternative...');
    try {
      const { spawnSync } = require('child_process');
      const result = spawnSync('node', [
        '-e',
        `
        const { execSync } = require('child_process');
        try { execSync('npm.cmd install pdf-parse --no-save', { stdio: 'inherit' }); }
        catch(e) { try { execSync('npx.cmd --yes pdf-parse', { stdio: 'inherit' }); } catch(e2) {} }
        `
      ], { stdio: 'inherit' });
      pdfParse = require('pdf-parse');
    } catch (e3) {
      console.error('Cannot install pdf-parse:', e3.message);
      process.exit(1);
    }
  }
}

const dataBuffer = fs.readFileSync(pdfPath);

pdfParse(dataBuffer).then(function(data) {
  console.log('Pages:', data.numpages);
  console.log('Info:', JSON.stringify(data.info, null, 2));
  console.log('Text length:', data.text.length);
  
  fs.writeFileSync(outputPath, data.text, 'utf8');
  console.log('\nDone! Output written to:', outputPath);
  console.log('Output file size:', fs.statSync(outputPath).size, 'bytes');
}).catch(function(err) {
  console.error('Parse error:', err);
});
