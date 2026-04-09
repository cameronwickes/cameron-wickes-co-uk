/** Blog data — auto-discovers markdown posts via Vite glob import. */

const WORDS_PER_MINUTE = 150

export interface BlogMeta {
  slug: string
  title: string
  category: string
  summary: string
  intro: string
  image: string
  readTime: number
}

export interface BlogPost extends BlogMeta {
  content: string
}

/** Calculate reading time from word count. */
function calcReadTime(text: string): number {
  return Math.max(1, Math.ceil(text.split(/\s+/).length / WORDS_PER_MINUTE))
}

/** Parse YAML frontmatter and body from a raw markdown string. */
function parseFrontmatter(raw: string, slug: string): BlogPost {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n*([\s\S]*)$/)
  if (!match) return { slug, title: slug, category: '', summary: '', intro: '', image: '', readTime: 1, content: raw }

  const fm: Record<string, string> = {}
  for (const line of match[1].split('\n')) {
    const i = line.indexOf(': ')
    if (i === -1) continue
    fm[line.slice(0, i).trim()] = line
      .slice(i + 2)
      .trim()
      .replace(/^"|"$/g, '')
  }

  const content = match[2]

  return {
    slug,
    title: fm.title ?? slug,
    category: fm.category ?? '',
    summary: fm.summary ?? '',
    intro: fm.intro ?? '',
    image: fm.image ?? '',
    readTime: calcReadTime(content),
    content,
  }
}

const modules = import.meta.glob('/src/static/content/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

export const blogPosts: BlogPost[] = Object.entries(modules)
  .map(([path, raw]) => {
    const slug = path.split('/').pop()!.replace('.md', '')
    return parseFrontmatter(raw, slug)
  })
  .sort((a, b) => a.category.localeCompare(b.category))

export const blogIndex: BlogMeta[] = blogPosts.map(({ content: _, ...meta }) => meta)

export function getPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug)
}
