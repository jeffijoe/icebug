const fs = require('fs');

console.log('Example started.');
setInterval(() => {
  const content = fs.readFileSync('example.txt');
  const asString = content.toString();
  console.log('-----', new Date(), '-----');
  console.log(asString);
}, 2000);