import sys
import os
import subprocess

pdf_path = r'c:\Users\bilal\OneDrive\Desktop\bilal-portfolio\cv elhamri bilal.pdf'
output_path = r'c:\Users\bilal\OneDrive\Desktop\bilal-portfolio\pdf_extracted_text.txt'
log_path = r'c:\Users\bilal\OneDrive\Desktop\bilal-portfolio\PYTHON_LOG.txt'

log_lines = []
def log(s):
    log_lines.append(str(s))

log('=== START ===')
log('Python: ' + sys.version)
log('Platform: ' + sys.platform)
log('PDF exists: ' + str(os.path.exists(pdf_path)))

try:
    from pdfminer.high_level import extract_text
    log('pdfminer already installed')
except Exception as e:
    log('Installing pdfminer.six: ' + str(e))
    try:
        r = subprocess.run(
            [sys.executable, '-m', 'pip', 'install', 'pdfminer.six', '--quiet', '--no-warn-script-location'],
            capture_output=True, text=True, timeout=180
        )
        log('pip rc: ' + str(r.returncode))
        if r.stdout: log('pip out: ' + r.stdout[-500:])
        if r.stderr: log('pip err: ' + r.stderr[-500:])
        from pdfminer.high_level import extract_text
        log('pdfminer installed & imported')
    except Exception as e2:
        log('Install FAILED: ' + str(e2))
        try:
            with open(log_path, 'w', encoding='utf-8') as lf:
                lf.write('\n'.join(log_lines))
        except: pass
        sys.exit(1)

try:
    log('Extracting text...')
    text = extract_text(pdf_path)
    log('Extracted chars: ' + str(len(text)))
    
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(text)
    log('Wrote to: ' + output_path)
    log('File size: ' + str(os.path.getsize(output_path)) + ' bytes')
    
    log('\n=== FULL TEXT PREVIEW ===\n')
    log(text[:5000] if len(text) > 5000 else text)
    
    log('\n=== COMPLETE (first 15000 chars in log) ===')
    log(text[:15000] if len(text) > 15000 else text)
    
except Exception as e:
    log('EXTRACTION ERROR: ' + str(e))
    import traceback
    log(traceback.format_exc())

try:
    with open(log_path, 'w', encoding='utf-8') as lf:
        lf.write('\n'.join(log_lines))
    print('LOG WRITTEN:', log_path, os.path.getsize(log_path), 'bytes')
except Exception as ee:
    print('LOG WRITE FAIL:', ee)
