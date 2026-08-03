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
    
    // Reduce input and google button padding from py-3.5 to py-2.5
    content = content.replace(/py-3\.5/g, 'py-2.5');
    
    // Reduce primary submit button padding from py-4 to py-3
    // Note: Some files might use py-4 for the submit button
    content = content.replace(/py-4/g, 'py-3');

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});
