const fs = require('fs');
const path = require('path');

const brandDir = 'C:\\Users\\benim\\Documents\\antigravity\\silly-noether\\assets\\brand';
const files = fs.readdirSync(brandDir);

files.forEach(file => {
  if (file.endsWith('.svg')) {
    const filePath = path.join(brandDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const pathCount = (content.match(/<path/g) || []).length;
    const viewBox = content.match(/viewBox="([^"]+)"/);
    const colors = [...new Set(content.match(/#[0-9a-fA-F]{6}/g) || [])];
    console.log(`${file}: paths=${pathCount}, viewBox=${viewBox ? viewBox[1] : 'none'}, colors=${colors.join(', ')}`);
  }
});
