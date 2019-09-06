# Jamstack Themes

Find the perfect theme for your next Jamstack project.

## Submit A Theme

Submit your theme to the gallery. Fork this repo and make the following changes, then do a pull-request.

1. Create a new markdown file in `content/theme` and add relevant front-matter.

```yaml
---
title: "My Theme Name"
thumbnail: 'images/theme/my-theme.png'
github: https://github.com/username/repo
demo: https://www.demo.com
author: Unknown Author
ssg:
  - Gridsome
cms:
  - NetlifyCMS
---
```

2. Add screenshots of your theme

Add a hires screenshot of your theme in `static/hires`. 

* 2880px wide by any height
* .png extension
* filesize should be under 2MB

Add a thumbnail screenshot of your theme in `static/images/thumbnail` - The thumbnail field in the frontmatter should refer to this image.

* 280px wide by 160px height

## Develop Locally

This site is built on [Hugo](https://gohugo.io/)

Fork and clone this repo.

Development Server

```
hugo serve
```

Build Site

```
hugo
```

## Utilities

```
npm install
```

Generate Github Stars

```
npm run stars
```

Generate Screenshots

```
npm run screenshots
```
