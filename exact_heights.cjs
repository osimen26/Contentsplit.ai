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
    
    // Replace `py-2.5` in input fields and buttons with `h-[44px]`
    content = content.replace(/px-4 py-2\.5/g, 'px-4 h-[44px]'); // For inputs
    content = content.replace(/py-2\.5 bg-\[\#F8FAFC\]/g, 'h-[44px] bg-[#F8FAFC]'); // For Google button
    content = content.replace(/py-3 bg-\[\#111827\]/g, 'h-[44px] bg-[#111827]'); // For Submit button

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});
