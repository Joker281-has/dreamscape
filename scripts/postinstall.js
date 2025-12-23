const fs = require('fs');
const path = require('path');

// Paths to problematic Expo winter files
const winterFiles = [
  'node_modules/expo/src/winter/runtime.native.js',
  'node_modules/expo/src/winter/installGlobal.js',
];

// Safe stub content
const stubContent = `
// Jest stub - added by postinstall script
// This file is auto-generated to prevent Expo winter runtime errors during tests
module.exports = {};
`;

console.log('Running postinstall: stubbing Expo winter files for Jest...');

winterFiles.forEach(filePath => {
  const fullPath = path.join(process.cwd(), filePath);
  const dir = path.dirname(fullPath);
  
  try {
    // Create directory if it doesn't exist
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    // Write stub file
    fs.writeFileSync(fullPath, stubContent, 'utf8');
    console.log(`✓ Stubbed: ${filePath}`);
  } catch (error) {
    console.warn(`⚠ Could not stub ${filePath}:`, error.message);
  }
});

console.log('Postinstall complete.');
