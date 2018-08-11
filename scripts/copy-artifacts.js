// inspired by https://medium.com/consonance/building-an-angular-library-with-the-angular-cli-version-6-384ee85933ad

const fs = require('fs');
const path = require('path');
const artifacts = ['README.md', 'CHANGELOG.md', 'LICENSE'];

artifacts.forEach(file => {
  let fromPath = path.resolve(__dirname, '..', '', file);
  let destPath = path.resolve(__dirname, '..', '', file);

  fs.readFile(fromPath, 'utf-8', (err, data) => {
    if (err) {
      console.log(`Read error occurred: ${err}`);
      return;
    }

    fs.writeFile(destPath, data, (err) => {
      if (err) {
        console.log(`Write error occurred: ${err}`);
        return;
      }
      console.log(`Copied ${file}:`);
    })
  })
});
