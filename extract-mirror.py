#!/usr/bin/env python3
"""Extract b64 images from a saved get_workflow_execution result into public/cdn-mirror."""
import json, base64, sys, os
raw = open(sys.argv[1]).read()
d = json.loads(raw)
found, errs = [], []
def walk(x):
    if isinstance(x, dict):
        if 'name' in x and 'b64' in x:
            found.append(x)
        for v in x.values(): walk(v)
    elif isinstance(x, list):
        for v in x: walk(v)
walk(d)
os.makedirs('public/cdn-mirror', exist_ok=True)
seen = set()
for it in found:
    n = it['name']
    if n in seen: continue
    seen.add(n)
    if it.get('b64'):
        with open('public/cdn-mirror/' + n, 'wb') as f:
            f.write(base64.b64decode(it['b64']))
    else:
        errs.append(n + ': ' + (it.get('err') or 'empty'))
print('saved', len(seen) - len(errs), 'of', len(seen))
for e in errs: print('ERR', e)
