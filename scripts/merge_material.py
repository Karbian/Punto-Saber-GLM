"""Merge the reviewed 2023 selection and original 2025 practice into bank.json.

Idempotent; retains historical records and progress IDs. Never publishes the
restricted 2025 scans. Run after prepare_bank.py or on its own.
"""
from pathlib import Path
import json
import shutil

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'dist' if (ROOT / 'dist/index.html').exists() else ROOT

def merge():
    path = OUT / 'bank.json'
    bank = json.loads(path.read_text())
    additions = json.loads((ROOT / 'data/new-material.json').read_text())
    extra = additions['questions']
    ids = {q['id'] for q in extra}
    bank['questions'] = [q for q in bank['questions'] if q['id'] not in ids] + extra
    subjects = {'matematicas': 'Matemáticas', 'lectura': 'Lectura Crítica',
                'ciencias': 'Ciencias Naturales', 'sociales': 'Sociales y Ciudadanas',
                'ingles': 'Inglés'}
    files = []
    for stem, subject in subjects.items():
        pdf = OUT / 'archive/2023-1' / (stem + '.pdf')
        if not pdf.exists():
            raise FileNotFoundError(f'Missing new source booklet: {pdf}')
        files.append({'id': '2023-1/' + pdf.name, 'period': '2023-1',
                      'subject': subject, 'advanced': False,
                      'title': subject + ' · Cuadernillo 1 (2023)',
                      'url': 'archive/2023-1/' + pdf.name, 'bytes': pdf.stat().st_size})
    new_urls = {p['url'] for p in files}
    bank['catalog'] = [p for p in bank['catalog'] if p['url'] not in new_urls] + files
    bank['provenance']['updated'] = '2026-10-19'
    bank['provenance']['additions'] = additions['notes']
    bank['provenance']['answerPolicy'] = ('2005-1: hoja de claves histórica. '
        '2023-1 y práctica original 2025: soluciones razonadas de Punto; '
        'no se atribuyen a una clave oficial.')
    path.write_text(json.dumps(bank, ensure_ascii=False, indent=2) + '\n')
    if OUT != ROOT:
        (OUT / 'data').mkdir(exist_ok=True)
        shutil.copy2(ROOT / 'data/new-material.json', OUT / 'data/new-material.json')
    print(json.dumps({'questions': len(bank['questions']), 'pdfs': len(bank['catalog'])}))

if __name__ == '__main__':
    merge()
