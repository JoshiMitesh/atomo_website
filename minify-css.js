const fs = require('fs');
const path = require('path');
const cssMinify = require('css-minify');

// Directory containing your CSS files
const cssDir = './';

// Get all CSS files
fs.readdir(cssDir, (err, files) => {
  if (err) throw err;
  
  files.forEach(file => {
    if (path.extname(file) === '.css') {
      const css = fs.readFileSync(path.join(cssDir, file), 'utf8');
      const minified = cssMinify.minify(css);
      
      // Save minified version (you can keep original with .min.css)
      fs.writeFileSync(path.join(cssDir, file.replace('.css', '.min.css')), minified);
      
      console.log(`Minified ${file}`);
    }
  });
});