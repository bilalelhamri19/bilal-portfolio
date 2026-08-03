import sys
import traceback

try:
    from PyPDF2 import PdfReader
except ImportError:
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "PyPDF2", "-q"])
    from PyPDF2 import PdfReader

pdf_path = r'c:\Users\bilal\OneDrive\Desktop\bilal-portfolio\cv elhamri bilal.pdf'
output_path = r'c:\Users\bilal\OneDrive\Desktop\bilal-portfolio\pdf_extracted_text.txt'

try:
    reader = PdfReader(pdf_path)
    print(f"Number of pages: {len(reader.pages)}")
    
    with open(output_path, 'w', encoding='utf-8') as f:
        for i, page in enumerate(reader.pages):
            f.write(f'=== PAGE {i+1} ===\n')
            text = page.extract_text()
            if text:
                f.write(text)
            f.write('\n\n')
    
    print(f"Success! Written to: {output_path}")
    print(f"File size: {__import__('os').path.getsize(output_path)} bytes")
except Exception as e:
    print(f"ERROR: {e}")
    traceback.print_exc()
