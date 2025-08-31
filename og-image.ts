import { getCollection } from 'astro:content'
import satori from 'satori'
import sharp from 'sharp'
import fs from 'fs'
import path from 'path'

const fontPath = path.join(process.cwd(), 'public/fonts/DMSans-SemiBold.ttf')
const fontData = fs.readFileSync(fontPath)

async function generate() {
  const posts = await getCollection('blog') // your blog collection
  for (const post of posts) {
    const svg = await satori(
      {
        type: 'div',
        props: {
          style: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '1200px',
            height: '630px',
            backgroundColor: '#000',
            color: '#fff',
            fontSize: '64px',
            fontFamily: 'DM Sans',
            padding: '40px',
            textAlign: 'center',
          },
          children: post.data.title,
        },
      },
      {
        width: 1200,
        height: 630,
        fonts: [{ name: 'DM Sans', data: fontData, weight: 700 }],
      }
    )

    const png = await sharp(Buffer.from(svg)).png().toBuffer()
    const outPath = path.join(process.cwd(), 'public/og', `${post.id}.png`)
    fs.mkdirSync(path.dirname(outPath), { recursive: true })
    fs.writeFileSync(outPath, png)
    console.log(`Generated OG image for ${post.id}`)
  }
}

generate()
