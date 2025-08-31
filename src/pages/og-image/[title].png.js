export const prerender = false

import satori from 'satori'
import sharp from 'sharp'
import fs from 'fs'
import path from 'path'

const fontPath = path.join(process.cwd(), 'public/fonts/DMSans-SemiBold.ttf')
const fontData = fs.readFileSync(fontPath)

export async function GET({ params }) {
  const title = decodeURIComponent(params.title.replace('.png', ''))

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '1200px',
          height: '630px',
          backgroundColor: '#000000',
          color: '#e1e4e8',
          fontSize: '64px',
          fontFamily: 'DM Sans',
          padding: '40px',
          textAlign: 'center',
          border: '4px solid #333333',
          boxSizing: 'border-box',
          color: '#ffffff',
        },
        children: title,
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'DM Sans',
          data: fontData,
          weight: 700,
          style: 'normal',
        },
      ],
    }
  )

  const png = await sharp(Buffer.from(svg)).png().toBuffer()
  return new Response(png, {
    headers: { 'Content-Type': 'image/png' },
  })
}
