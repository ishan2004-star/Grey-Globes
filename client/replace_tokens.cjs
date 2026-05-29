const fs = require('fs');
const path = require('path');

const replacements = {
  'rgba(255,255,255,0.72)': 'var(--color-secondary)',
  'rgba(255,255,255,0.55)': 'var(--color-muted)',
  'rgba(255,255,255,0.08)': 'var(--color-border)',
  'rgba(255,255,255,0.03)': 'var(--color-overlay)',
  'rgba(255,255,255,0.15)': 'var(--color-line)',
  '#ffffff': 'var(--color-primary)',
  '"Poppins", sans-serif': 'var(--font-family)',
  '120px 80px 160px 80px': 'var(--section-padding)',
  '100px 28px 140px 28px': 'var(--section-padding-mobile)',
  'gap: 60px': 'gap: var(--content-gap)',
  'gap: 42px': 'gap: var(--content-gap-mobile)',
  '0.4s ease': 'var(--transition-default)',
};

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Global string replacements
  for (const [key, value] of Object.entries(replacements)) {
    // Avoid replacing if it's already var(--...) or something, though these are hardcoded strings.
    // Use split/join for global replacement
    content = content.split(key).join(value);
  }

  // Handle 'white' carefully to avoid replacing part of another word like 'whitesmoke'
  // Only replace 'white' if it's preceded by space/colon and followed by semicolon/space/newline
  content = content.replace(/(?<=[:\s])white(?=[\s;!])/g, 'var(--color-primary)');

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated: ${filePath}`);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.css') && !fullPath.includes('tokens.css')) {
      processFile(fullPath);
    }
  }
}

walkDir(path.join(__dirname, 'src'));
console.log('Done!');
