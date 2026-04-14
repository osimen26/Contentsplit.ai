const fs = require('fs');
const path = require('path');

const skillsDir = path.join(__dirname, 'skills');
const files = fs.readdirSync(skillsDir).filter(f => f.endsWith('.md'));

console.log('=== MD3 Reference Validation Check ===\n');

const foundationFiles = [
  'color.md',
  'typography.md', 
  'elevation.md',
  'spacing.md',
  'radius.md',
  'design-implementation.md'
];

const componentFiles = [
  'button.md',
  'input.md',
  'card.md',
  'icons.md',
  'form-field.md',
  'component-specification.md',
  'table.md',
  'toast.md',
  'modal.md',
  'select.md',
  'navigation.md',
  'chips.md',
  'tooltips.md'
];

let allPassed = true;

console.log('FOUNDATION LAYER FILES:');
console.log('=======================');
for (const file of foundationFiles) {
  if (!files.includes(file)) {
    console.log(`❌ ${file}: NOT FOUND`);
    allPassed = false;
    continue;
  }
  
  const content = fs.readFileSync(path.join(skillsDir, file), 'utf8');
  const hasMD3 = content.includes('Material Design 3') || content.includes('MD3') || content.includes('Google Material Design 3');
  
  if (hasMD3) {
    console.log(`✅ ${file}: Proper MD3 reference found`);
  } else {
    console.log(`❌ ${file}: NO MD3 reference found`);
    allPassed = false;
  }
}

console.log('\nCOMPONENT LAYER FILES:');
console.log('======================');
for (const file of componentFiles) {
  if (!files.includes(file)) {
    console.log(`⚠️  ${file}: NOT FOUND (may be OK if not yet created)`);
    continue;
  }
  
  const content = fs.readFileSync(path.join(skillsDir, file), 'utf8');
  const hasMD3 = content.includes('Material Design 3') || content.includes('MD3') || content.includes('Google Material Design 3');
  
  if (hasMD3) {
    console.log(`✅ ${file}: Proper MD3 reference found`);
  } else {
    console.log(`❌ ${file}: NO MD3 reference found`);
    allPassed = false;
  }
}

console.log('\n=== SUMMARY ===');
if (allPassed) {
  console.log('✅ All files have proper MD3 references!');
} else {
  console.log('❌ Some files are missing MD3 references.');
  console.log('\nRECOMMENDATION: Update missing files to include "Google Material Design 3" or "Material Design 3" in their overview sections.');
}

// Check token generation
console.log('\n=== TOKEN SYSTEM VALIDATION ===');
const tokensCss = path.join(__dirname, 'design-tokens-ultimate.css');
if (fs.existsSync(tokensCss)) {
  const css = fs.readFileSync(tokensCss, 'utf8');
  const hasRadius = css.includes('--sys-radius-');
  const hasSpacing = css.includes('--sys-spacing-');
  const hasColor = css.includes('--sys-color-');
  const hasTypography = css.includes('--sys-typography-');
  
  console.log(`✅ design-tokens-ultimate.css exists (${css.split('\n').length} lines)`);
  console.log(`   - Radius tokens: ${hasRadius ? '✅ Found' : '❌ Missing'}`);
  console.log(`   - Spacing tokens: ${hasSpacing ? '✅ Found' : '❌ Missing'}`);
  console.log(`   - Color tokens: ${hasColor ? '✅ Found' : '❌ Missing'}`);
  console.log(`   - Typography tokens: ${hasTypography ? '✅ Found' : '❌ Missing'}`);
} else {
  console.log('❌ design-tokens-ultimate.css not found');
  allPassed = false;
}

process.exit(allPassed ? 0 : 1);