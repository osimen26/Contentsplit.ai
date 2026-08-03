const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  'src/pages/auth/RegisterPage.tsx',
  'src/pages/auth/LoginPage.tsx'
];

filesToUpdate.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Change submit button margin from mb-8 to mb-6
    content = content.replace(/items-center mb-8/g, 'items-center mb-6');
    
    // Change divider margin from mb-8 to mb-6
    content = content.replace(/w-full mb-8/g, 'w-full mb-6');
    
    // Change Google button margin from mb-10 to mb-8
    content = content.replace(/gap-3 mb-10/g, 'gap-3 mb-8');

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated spacing in ${file}`);
  }
});
