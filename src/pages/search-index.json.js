import { getCollection } from 'astro:content'
import { format } from 'date-fns'

export async function GET() {
  const posts = await getCollection('blog')

  const formats = [
    'yyyy',
    'yy',
    'MMMM', // August
    'MMM', // Aug
    'MM', // 08
    'd', // 5
    'dd', // 05
    'd MMMM yyyy',
    'd MMM yyyy',
    'd MMMM',
    'd MMM',
    'MMMM yyyy',
    'MMM yyyy',
    'MM/yyyy',
    'MM/yy',
    'dd/MM/yyyy',
    'dd/MM/yy',
    'dd/MM',
  ]

  const data = posts.map((p) => {
    const d = new Date(p.data.date)

    const dateStrings = Array.from(
      new Set(
        formats.map((f) => format(d, f)) // remove duplicates
      )
    )

    return {
      id: p.id,
      title: p.data.title,
      description: p.data.description,
      date: p.data.date,
      dateStrings,
    }
  })

  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  })
}
