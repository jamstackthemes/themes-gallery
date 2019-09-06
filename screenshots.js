#!/usr/bin/env node

const fs = require('fs');
const im = require('imagemagick');

const imageFiles = fs.readdirSync('./static/hires');

imageFiles.forEach((image) => {
  im.crop({
    srcPath: `./static/hires/${image}`,
    dstPath: `./static/images/theme/thumbnail/${image}`,
    width: 280,
    height: 180,
    quality: 1,
    gravity: "North"
  }, function(err, stdout, stderr){
    if (err) throw err;
    console.log(`resized ${image} to 280x180`);
  });
});
