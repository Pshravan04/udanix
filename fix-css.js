const fs = require('fs');
let css = fs.readFileSync('src/app/globals.css', 'utf8');

css = css.replace(/@layer utilities \{([\s\S]*?)\n\}/, (match, content) => {
    let newContent = content.replace(/^[ \t]*\.([a-zA-Z0-9_-]+)\s*\{/gm, '  @utility $1 {');
    return "@layer utilities {" + newContent + "\n}";
});

fs.writeFileSync('src/app/globals.css', css);
console.log('Fixed globals.css');
