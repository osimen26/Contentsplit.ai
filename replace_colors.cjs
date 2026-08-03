const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Replace primary purples with slate-900 (#111827)
  content = content.replace(/#6b61e7/gi, '#111827');
  content = content.replace(/#6B61E7/g, '#111827');
  content = content.replace(/#6366f1/gi, '#111827');
  content = content.replace(/#4f46e5/gi, '#111827');
  content = content.replace(/#8b5cf6/gi, '#111827');
  content = content.replace(/#a855f7/gi, '#111827');

  // Replace rgb values for rgba
  content = content.replace(/107,\s*97,\s*231/g, '17, 24, 39');
  content = content.replace(/99,\s*102,\s*241/g, '17, 24, 39'); // #6366f1 in rgb
  
  // Replace hover states with slate-800 (#1f2937)
  content = content.replace(/#4338ca/gi, '#1f2937');
  content = content.replace(/#4338CA/g, '#1f2937');
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
  }
}

function walk(dir) {
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      walk(filePath);
    } else {
      if (filePath.endsWith('.css') || filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
        replaceInFile(filePath);
      }
    }
  });
}

walk(path.join(__dirname, 'src'));
