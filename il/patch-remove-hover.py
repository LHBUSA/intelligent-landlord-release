import re, os, glob

# Files that are server components but have onMouseEnter/Leave
FILES = [
    'app/page.tsx',
    'app/guides/page.tsx',
    'app/market/page.tsx',
    'app/legal/page.tsx',
    'app/legal/states/page.tsx',
]

root = os.path.dirname(os.path.abspath(__file__))

for rel in FILES:
    path = os.path.join(root, rel)
    if not os.path.exists(path):
        print(f'SKIP (not found): {rel}')
        continue
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Remove onMouseEnter and onMouseLeave handler lines/attributes
    # Pattern: onMouseEnter={...} or onMouseLeave={...} as JSX props
    new = re.sub(r'\s*onMouse(?:Enter|Leave)=\{[^}]+\}\s*', ' ', content)

    if new != content:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(new)
        print(f'✅ Patched: {rel}')
    else:
        print(f'  No change needed: {rel}')

print('\nDone.')
