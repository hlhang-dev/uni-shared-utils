const fs = require('fs');
const path = require('path');

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function writeJSON(p, obj) {
  ensureDir(path.dirname(p));
  fs.writeFileSync(p, JSON.stringify(obj, null, 2), 'utf8');
}

writeJSON(path.join(__dirname, '..', 'dist', 'esm', 'package.json'), { type: 'module' });
writeJSON(path.join(__dirname, '..', 'dist', 'cjs', 'package.json'), { type: 'commonjs' });

console.log('Wrote dist/esm/package.json {"type":"module"} and dist/cjs/package.json {"type":"commonjs"}');
