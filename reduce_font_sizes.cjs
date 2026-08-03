const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  'src/pages/auth/RegisterPage.tsx',
  'src/pages/auth/LoginPage.tsx',
  'src/pages/auth/RecoverPage.tsx',
  'src/pages/auth/ResetPasswordPage.tsx'
];

filesToUpdate.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Reduce heading
    content = content.replace(/text-3xl/g, 'text-[28px]');
    
    // Reduce subtitle and labels
    content = content.replace(/text-\[15px\]/g, 'text-[14px]');
    
    // Add text-[14px] to inputs to reduce placeholder and input text
    content = content.replace(/rounded-lg text-slate-900/g, 'rounded-lg text-[14px] text-slate-900');
    
    // Check buttons, usually they are text-sm or we can just add text-[14px] to them if they don't have it
    // The main submit button:
    // py-4 bg-[#111827] hover:bg-slate-800 text-white font-medium
    content = content.replace(/text-white font-medium/g, 'text-white text-[15px] font-medium');

    // Google button:
    // text-slate-700 font-medium
    content = content.replace(/text-slate-700 font-medium/g, 'text-slate-700 text-[14px] font-medium');

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});
