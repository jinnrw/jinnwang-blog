---
title: My first blog built with React and Gatsby
date: "2020-01-08"
description: "Gatsby is a free open source framework based on React to generate static websites."
tags: ["React", "Gatsby"]
---

Gatsby is a free open source framework based on React to generate static websites. It has many useful plugins to help building websites or apps faster, things like services worker, SEO, markdown support and styled components etc. It also has many built-in features like routing and GraphQL.


#### How to add syntax highligher
To add syntax highlighting to code blocks in markdown files in Gatsby. Simply use this plugin [gatsby-remark-prismjs](https://www.gatsbyjs.org/packages/gatsby-remark-prismjs/).

In your markdown file, write the following texts:
```
    ```javascript
    const myMethod = (a, b) => {
    return a + b
    }
    ```
```

This is what you'll see after implemented:
```js
const myMethod = (a, b) => {
   return a + b
}
```

To be continued...
