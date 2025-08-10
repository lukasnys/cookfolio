import { createContentLoader } from 'vitepress'

export default createContentLoader('*.md', {
  exclude: ['index.md', 'template.md'],
  transform: (content) => {
    return content.map((page) => ({
      title: page.frontmatter.title,
      url: page.url.replace('/', ''),
    }));
  }
})