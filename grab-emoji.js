if (!process.argv[2]) {
  console.log('You forgot the filename!');
  console.log('(╯°□°)╯︵ ┻━┻ ');
  process.exit();
}
const emojis = require(`./${process.argv[2]}`).emoji;
const fs = require('fs');
const https = require('https');
console.log('Emoji', emojis.length);
for (emoji of emojis) {
  const extension = emoji.url.split('.').pop();
  const file = fs.createWriteStream(`./output/${emoji.name}.${extension}`);
  const request = https
    .get(emoji.url, function (response) {
      response.pipe(file);

      // after download completed close filestream
      file.on('finish', () => {
        file.close();
        // console.log('Download Completed');
      });
    })
    .on('error', e => {
      console.warn('error!', e);
    });
}
