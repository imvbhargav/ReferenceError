import rss from '@astrojs/rss'
import { marked } from 'marked'
import { getCollection } from 'astro:content'

export async function GET(context) {
  const posts = await getCollection('blog')
  // Sort posts by date in descending order (latest first)
  const sortedPosts = posts.sort(
    (a, b) => new Date(b.data.date) - new Date(a.data.date)
  )
  return rss({
    title: 'ReferenceError',
    description: 'Referenceerror: my coding diary as I figure things out.',
    site: 'https://referenceerror.netlify.app',
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      pubDate: new Date(post.data.date),
      link: `/blog/${post.id}`,
      content: marked.parse(post.body),
    })),
    customData: `<language>en-us</language>`,
  })
}
