const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      results.push(file);
    }
  });
  return results;
}

const files = walk('src/app');

files.forEach(file => {
  if (!file.endsWith('.tsx')) return;
  
  let content = fs.readFileSync(file, 'utf8');
  if (!content.includes('<details') || content.includes('FaqAccordion')) return;
  
  let modified = false;
  
  // Replace <section id="faq" ... to </section> if it has <details>
  const regex = /<section[^>]*?id="faq"[^>]*?>[\s\S]*?<\/section>/;
  if (regex.test(content)) {
    content = content.replace(regex, '<FaqAccordion faqData={faqData} />');
    modified = true;
  } else if (content.includes('faqData.map')) {
    console.log('Found map but no section match in ' + file);
  }
  
  if (modified) {
    if (!content.includes('import FaqAccordion')) {
      if (content.includes('import Breadcrumbs')) {
        content = content.replace(/import Breadcrumbs.*?;/, match => match + '\nimport FaqAccordion from \'@/components/FaqAccordion\';');
      } else if (content.includes('import Link')) {
        content = content.replace(/import Link.*?;/, match => match + '\nimport FaqAccordion from \'@/components/FaqAccordion\';');
      } else {
        content = 'import FaqAccordion from \'@/components/FaqAccordion\';\n' + content;
      }
    }
    fs.writeFileSync(file, content);
    console.log('Updated ' + file);
  }
});
