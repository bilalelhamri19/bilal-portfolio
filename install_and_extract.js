const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const npmCli = "C:\\Program Files\\nodejs\\node_modules\\npm\\bin\\npm-cli.js";
const pdfjsPkg = 'pdfjs-dist@3.11.174';

console.log('Installing pdfjs-dist...');
try {
  execSync(`node "${npmCli}" install ${pdfjsPkg} --no-save`, { 
    stdio: 'inherit',
    cwd: __dirname,
    timeout: 120000
  });
  console.log('Install complete!');
} catch (e) {
  console.log('Install may have completed with warnings:', e.message);
}

console.log('\nLoading pdfjs-dist...');

let pdfjsLib;
try {
  const pdfjsPath = path.resolve(__dirname, 'node_modules', 'pdfjs-dist', 'legacy', 'build', 'pdf.js');
  const pdfjsWorker = path.resolve(__dirname, 'node_modules', 'pdfjs-dist', 'legacy', 'build', 'pdf.worker.js');
  
  if (fs.existsSync(pdfjsPath)) {
    process.env.GLOBAL_PDFJS_WORKER = pdfjsWorker;
    pdfjsLib = require(pdfjsPath);
    pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;
    console.log('pdfjs loaded from legacy build');
  } else {
    const pdfjsPath2 = path.resolve(__dirname, 'node_modules', 'pdfjs-dist', 'build', 'pdf.js');
    const pdfjsWorker2 = path.resolve(__dirname, 'node_modules', 'pdfjs-dist', 'build', 'pdf.worker.js');
    if (fs.existsSync(pdfjsPath2)) {
      pdfjsLib = require(pdfjsPath2);
      pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker2;
      console.log('pdfjs loaded from standard build');
    } else {
      console.log('Trying alternative imports...');
      pdfjsLib = require('pdfjs-dist');
      console.log('pdfjs loaded via standard require');
    }
  }
} catch (e) {
  console.error('Failed to load pdfjs:', e.message);
  console.error(e.stack);
  process.exit(1);
}

const pdfPath = path.resolve(__dirname, 'cv elhamri bilal.pdf');
const outputPath = path.resolve(__dirname, 'pdf_extracted_text.txt');

console.log(`\nReading PDF: ${pdfPath}`);
console.log(`PDF exists: ${fs.existsSync(pdfPath)}`);
console.log(`PDF size: ${fs.statSync(pdfPath).size} bytes`);

const data = new Uint8Array(fs.readFileSync(pdfPath));

(async () => {
  try {
    const loadingTask = pdfjsLib.getDocument({
      data: data,
      useSystemFonts: true,
      standardFontDataDir: path.dirname(require.resolve('pdfjs-dist/package.json')) + '/standard_fonts/'
    });
    
    const pdf = await loadingTask.promise;
    console.log(`\nPDF loaded! Pages: ${pdf.numPages}`);
    
    let fullText = '';
    
    for (let i = 1; i <= pdf.numPages; i++) {
      console.log(`Processing page ${i}...`);
      const page = await pdf.getPage(i);
      fullText += `=== PAGE ${i} ===\n`;
      
      const textContent = await page.getTextContent();
      let pageText = '';
      let lastY = null;
      let lastX = null;
      
      const items = textContent.items.sort((a, b) => {
        const yDiff = (b.transform[5] || 0) - (a.transform[5] || 0);
        if (Math.abs(yDiff) > 2) return yDiff;
        return (a.transform[4] || 0) - (b.transform[4] || 0);
      });
      
      for (const item of items) {
        const y = item.transform[5] || 0;
        const x = item.transform[4] || 0;
        
        if (lastY !== null && Math.abs(y - lastY) > 3) {
          pageText += '\n';
          lastX = null;
        } else if (lastX !== null && x - lastX > 8) {
          pageText += ' ';
        }
        
        pageText += item.str;
        lastY = y;
        lastX = x + (item.width || 0);
      }
      
      fullText += pageText + '\n\n';
    }
    
    fs.writeFileSync(outputPath, fullText, 'utf8');
    console.log(`\n=== DONE! ===`);
    console.log(`Output written to: ${outputPath}`);
    console.log(`Total chars: ${fullText.length}`);
    console.log(`\n=== FULL TEXT OUTPUT ===\n`);
    console.log(fullText);
    
  } catch (e) {
    console.error('FATAL ERROR:', e);
    console.error(e.stack);
  }
})();
