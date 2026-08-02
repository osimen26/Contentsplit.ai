const fs = require('fs');
let content = fs.readFileSync('src/pages/LandingPage.tsx', 'utf-8');

// Remove the bottom tabs
const tabRegex = /<div className="cs-anime-bottom-nav">[\s\S]*?<\/div>\s*/;
content = content.replace(tabRegex, '');

// Clean up unused variables
content = content.replace('Menu, X, ArrowRight, Check, ChevronDown, Copy,', 'ArrowRight, Check, ChevronDown, Copy,');
content = content.replace('Mail, List, Paperclip', 'Mail, Paperclip');
content = content.replace(/const FONT_IMPORT = .*?;\n/g, '');

fs.writeFileSync('src/pages/LandingPage.tsx', content);
console.log('Fixed LandingPage.tsx');
