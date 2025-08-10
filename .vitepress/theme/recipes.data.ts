import { createContentLoader } from 'vitepress'

export default createContentLoader('recipes/*.md', {
  transform: (content) => {
    return content.map((page) => ({
      title: page.frontmatter.title,
      url: page.url.replace('/', ''),
    }));
  }
})