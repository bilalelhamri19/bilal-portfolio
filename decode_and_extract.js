const fs = require('fs');
const zlib = require('zlib');

const pdfPath = 'cv elhamri bilal.pdf';
const outputPath = 'pdf_extracted_text.txt';

function caesarDecode(str, shift) {
    return str.replace(/[a-zA-Z\u00C0-\u024F]/g, function(c) {
        const code = c.charCodeAt(0);
        let base, letters;
        
        if (code >= 65 && code <= 90) {
            base = 65;
            letters = 26;
        } else if (code >= 97 && code <= 122) {
            base = 97;
            letters = 26;
        } else {
            return c;
        }
        
        const decoded = ((code - base - shift) % letters + letters) % letters + base;
        return String.fromCharCode(decoded);
    });
}

console.log('Reading PDF...');
const buffer = fs.readFileSync(pdfPath);
console.log('PDF size:', buffer.length, 'bytes');

const allDecodedText = [];

const str = buffer.toString('binary');
const streamRegex = /stream\r?\n([\s\S]*?)endstream/g;
let match;
let streamCount = 0;

while ((match = streamRegex.exec(str)) !== null) {
    streamCount++;
    const streamData = match[1];
    try {
        const compressed = Buffer.from(streamData, 'binary');
        let decompressed;
        try {
            decompressed = zlib.inflateSync(compressed);
        } catch (e) {
            try {
                decompressed = zlib.unzipSync(compressed);
            } catch (e2) {
                continue;
            }
        }
        
        const content = decompressed.toString('utf8');
        
        const btRegex = /BT([\s\S]*?)ET/g;
        let btMatch;
        while ((btMatch = btRegex.exec(content)) !== null) {
            const block = btMatch[1];
            
            const tjRegex = /\(((?:\\.|[^\\)])*)\)\s*Tj/g;
            let tjMatch;
            while ((tjMatch = tjRegex.exec(block)) !== null) {
                let text = tjMatch[1];
                text = text.replace(/\\n/g, '\n')
                          .replace(/\\r/g, '\r')
                          .replace(/\\t/g, '\t')
                          .replace(/\\\(/g, '(')
                          .replace(/\\\)/g, ')')
                          .replace(/\\\\/g, '\\');
                if (text) {
                    allDecodedText.push(caesarDecode(text, 3));
                }
            }
            
            const tjArrRegex = /\[([\s\S]*?)\]\s*TJ/g;
            let tjArrMatch;
            while ((tjArrMatch = tjArrRegex.exec(block)) !== null) {
                const arrContent = tjArrMatch[1];
                const strRegex = /\(((?:\\.|[^\\)])*)\)/g;
                let sMatch;
                let combined = '';
                while ((sMatch = strRegex.exec(arrContent)) !== null) {
                    let text = sMatch[1];
                    text = text.replace(/\\n/g, '\n')
                              .replace(/\\r/g, '\r')
                              .replace(/\\t/g, '\t')
                              .replace(/\\\(/g, '(')
                              .replace(/\\\)/g, ')')
                              .replace(/\\\\/g, '\\');
                    combined += text;
                }
                if (combined) {
                    allDecodedText.push(caesarDecode(combined, 3));
                }
            }
        }
    } catch (e) {
    }
}

console.log(`Found ${streamCount} streams, ${allDecodedText.length} text blocks`);

const result = allDecodedText.join('\n');
fs.writeFileSync(outputPath, result, 'utf8');
console.log('Wrote', result.length, 'characters to', outputPath);

console.log('\n========== FULL DECODED TEXT ==========\n');
console.log(result);
