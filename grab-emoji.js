const emojis = require('./emoji').emoji;
const fs = require('fs');
const https = require('https');

for (emoji of emojis) {
  console.log('emoji url', emoji.url);
  const extension = emoji.url.split('.').pop();
  const file = fs.createWriteStream(`./output/${emoji.name}.${extension}`);
  const request = https.get(emoji.url, function (response) {
    response.pipe(file);

    // after download completed close filestream
    file.on('finish', () => {
      file.close();
      console.log('Download Completed');
    });
  });
}
