import pdfplumber

pdf_path = r'c:\Users\bilal\OneDrive\Desktop\bilal-portfolio\cv elhamri bilal.pdf'
output_path = r'c:\Users\bilal\OneDrive\Desktop\bilal-portfolio\pdf_extracted_text.txt'

with open(output_path, 'w', encoding='utf-8') as out_file:
    with pdfplumber.open(pdf_path) as pdf:
        for i, page in enumerate(pdf.pages):
            out_file.write(f'=== PAGE {i+1} ===\n')
            text = page.extract_text()
            if text:
                out_file.write(text)
            out_file.write('\n\n')

print(f'Extraction complete. Output written to: {output_path}')
print(f'Total pages: {len(pdf.pages)}')

