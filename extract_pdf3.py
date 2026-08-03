import sys
import os

pdf_path = r'c:\Users\bilal\OneDrive\Desktop\bilal-portfolio\cv elhamri bilal.pdf'
output_path = r'c:\Users\bilal\OneDrive\Desktop\bilal-portfolio\pdf_extracted_text.txt'

sys.stdout.reconfigure(encoding='utf-8', line_buffering=True)
sys.stderr.reconfigure(encoding='utf-8', line_buffering=True)

print(f"Script starting...", flush=True)
print(f"PDF path: {pdf_path}", flush=True)
print(f"PDF exists: {os.path.exists(pdf_path)}", flush=True)
print(f"PDF size: {os.path.getsize(pdf_path)} bytes", flush=True)

try:
    from PyPDF2 import PdfReader
    print("PyPDF2 imported successfully", flush=True)
except Exception as e:
    print(f"PyPDF2 import failed: {e}", flush=True)
    try:
        import subprocess
        result = subprocess.run(
            [sys.executable, "-m", "pip", "install", "PyPDF2", "-v"],
            capture_output=True, text=True, timeout=120
        )
        print(f"pip stdout: {result.stdout[-500:]}", flush=True)
        print(f"pip stderr: {result.stderr[-500:]}", flush=True)
        from PyPDF2 import PdfReader
        print("PyPDF2 installed and imported", flush=True)
    except Exception as e2:
        print(f"PyPDF2 install failed: {e2}", flush=True)
        sys.exit(1)

try:
    reader = PdfReader(pdf_path)
    print(f"Pages: {len(reader.pages)}", flush=True)
    
    full_text = ""
    for i, page in enumerate(reader.pages):
        print(f"Processing page {i+1}...", flush=True)
        full_text += f'=== PAGE {i+1} ===\n'
        text = page.extract_text()
        if text:
            full_text += text + '\n'
        else:
            full_text += "[NO TEXT EXTRACTED]\n"
        full_text += '\n'
    
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(full_text)
    
    print(f"Written to: {output_path}", flush=True)
    print(f"Output size: {os.path.getsize(output_path)} bytes", flush=True)
    print(f"Total characters: {len(full_text)}", flush=True)
    
    print("\n=== FIRST 500 CHARS ===", flush=True)
    print(full_text[:500], flush=True)
    
except Exception as e:
    print(f"ERROR: {e}", flush=True)
    import traceback
    traceback.print_exc()
    sys.exit(1)
