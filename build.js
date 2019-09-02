#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const yamlFront = require('yaml-front-matter');
const gh = require('parse-github-url');
const axios = require('axios');
const im = require('imagemagick');

const themesFolder = './content/theme';

const themeFiles = fs.readdirSync(themesFolder);
const themeData = [];

const token = process.env.GITHUB_TOKEN;

loadTheme = async file => {
  console.log(file);
  const data = fs.readFileSync(path.join(themesFolder, file));
  const frontmatter = yamlFront.loadFront(data);

  if (frontmatter.github) {
    let github = gh(frontmatter.github);
    let themeGithubData = {
      name: github.name,
      owner: github.owner,
      repo: github.repo,
      demo: frontmatter.demo
    };

    repoResponse = await axios.get(
      `https://api.github.com/repos/${github.repo}`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );

    themeGithubData.stars = repoResponse.data.stargazers_count;
    themeData.push(themeGithubData);
  }
};

Promise.all(themeFiles.map(file => loadTheme(file)))
  .then(res => {
    fs.writeFileSync('./data/stars.json', JSON.stringify(themeData));
  })
  .catch(error => {
    console.log(error.message, error.config.url);
  });


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
