/**
 * BlogCard — post preview card for the blog listing grid.
 *
 * Displays a feature image (or gradient fallback), category and
 * reading time tags, title (clamped to 2 lines), and summary.
 * Links to the full blog post page.
 */
import { Link } from 'react-router-dom'
import Tag from '../elements/Tag'
import type { BlogMeta } from '../../static/data/blog'

export default function BlogCard({ post }: { post: BlogMeta }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group flex flex-col bg-terminal-surface border border-terminal-border rounded-xl overflow-hidden hover:border-terminal-green/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,159,0.05)]"
    >
      {/* Feature image with subtle zoom on hover */}
      <div className="aspect-[2/1] bg-terminal-bg relative overflow-hidden">
        {post.image ? (
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-terminal-green/10 to-terminal-cyan/10 group-hover:from-terminal-green/20 group-hover:to-terminal-cyan/20 transition-colors" />
        )}
      </div>

      {/* Card content */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-3">
          <Tag>{post.category}</Tag>
          <Tag variant="cyan">{post.readTime} min read</Tag>
        </div>
        <h3 className="text-sm font-semibold text-terminal-text group-hover:text-terminal-green transition-colors mb-2 line-clamp-2 min-h-[2.5rem]">
          {post.title}
        </h3>
        <p className="text-xs text-terminal-dim line-clamp-3 flex-1">{post.summary}</p>
      </div>
    </Link>
  )
}
