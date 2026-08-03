const fs = require('fs');
const zlib = require('zlib');

const pdfPath = 'cv elhamri bilal.pdf';
const outputPath = 'pdf_extracted_text.txt';

console.log('Reading PDF...');
const buffer = fs.readFileSync(pdfPath);
console.log('PDF size:', buffer.length, 'bytes');

let extracted = '';

// First, try to find all readable text strings in the PDF
// PDFs often store text in BT...ET blocks with Tj/TJ operators
const str = buffer.toString('binary');
const textBlocks = [];

// Find stream objects and decompress them
const streamRegex = /stream\r?\n([\s\S]*?)endstream/g;
let match;
let streamCount = 0;

while ((match = streamRegex.exec(str)) !== null) {
    streamCount++;
    const streamData = match[1];
    try {
        // Try to decompress if it's deflated
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
        
        // Extract text from BT...ET blocks
        const btRegex = /BT([\s\S]*?)ET/g;
        let btMatch;
        while ((btMatch = btRegex.exec(content)) !== null) {
            const block = btMatch[1];
            
            // Extract strings in parentheses (Tj operator)
            const tjRegex = /\(((?:\\.|[^\\)])*)\)\s*Tj/g;
            let tjMatch;
            while ((tjMatch = tjRegex.exec(block)) !== null) {
                let text = tjMatch[1];
                // Unescape PDF string escapes
                text = text.replace(/\\n/g, '\n')
                          .replace(/\\r/g, '\r')
                          .replace(/\\t/g, '\t')
                          .replace(/\\\(/g, '(')
                          .replace(/\\\)/g, ')')
                          .replace(/\\\\/g, '\\');
                if (text.trim()) textBlocks.push(text);
            }
            
            // Extract arrays of strings (TJ operator)
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
                if (combined.trim()) textBlocks.push(combined);
            }
        }
    } catch (e) {
        // Skip this stream
    }
}

console.log(`Found ${streamCount} streams, ${textBlocks.length} text blocks`);

extracted = textBlocks.join('\n');

// Also try to extract any literal UTF-16BE strings (common in PDFs for Unicode)
// Look for strings starting with FE FF (BOM) in the raw buffer
const utf16Regex = /\xFE\xFF((?:[\x00-\xFF][\x00-\xFF])*?)(?=\xFE\xFF|$)/g;
const rawStr = buffer.toString('binary');
let uMatch;
while ((uMatch = utf16Regex.exec(rawStr)) !== null) {
    try {
        const buf = Buffer.from('\xFE\xFF' + uMatch[1], 'binary');
        const decoded = buf.toString('utf16le');
        if (decoded && decoded.length > 2 && /[a-zA-Z]/.test(decoded)) {
            extracted += '\n[UTF16] ' + decoded;
        }
    } catch (e) {}
}

// Clean up
extracted = extracted.replace(/\x00/g, '');

fs.writeFileSync(outputPath, extracted, 'utf8');
console.log('Wrote', extracted.length, 'characters to', outputPath);
console.log('\n=== PREVIEW (first 2000 chars) ===');
console.log(extracted.substring(0, 2000));
