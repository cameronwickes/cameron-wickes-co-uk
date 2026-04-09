/**
 * BlogPost — individual blog post page.
 *
 * Fetches post data (including content) by slug from the blog index.
 * Renders a header with metadata, an optional intro paragraph,
 * and the full markdown body. Shows a 404 if the slug doesn't match.
 */
import { useParams } from 'react-router-dom'
import { getPost } from '../static/data/blog'
import PostHeader from '../components/blog/PostHeader'
import PostNotFound from '../components/blog/PostNotFound'
import MarkdownRenderer from '../components/blog/MarkdownRenderer'

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const post = slug ? getPost(slug) : undefined

  if (!post) return <PostNotFound />

  return (
    <div className="pt-14 min-h-screen">
      <article className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <PostHeader meta={post} readTime={post.readTime} intro={post.intro || undefined} />
          <MarkdownRenderer content={post.content} />
        </div>
      </article>
    </div>
  )
}
