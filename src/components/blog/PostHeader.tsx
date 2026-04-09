/**
 * PostHeader — blog post header shown above the article content.
 *
 * Displays a back link, category/reading time tags, title, summary,
 * and an optional italic intro paragraph (rendered as markdown).
 * Two dividers separate the header sections visually.
 */
import { Link } from 'react-router-dom'
import Tag from '../elements/Tag'
import MarkdownRenderer from './MarkdownRenderer'
import type { BlogMeta } from '../../static/data/blog'

interface PostHeaderProps {
  /** Post metadata (title, category, summary, etc.). */
  meta: BlogMeta
  /** Estimated reading time in minutes. */
  readTime: number
  /** Optional italic intro paragraph (markdown string). */
  intro?: string
}

export default function PostHeader({ meta, readTime, intro }: PostHeaderProps) {
  return (
    <>
      {/* Navigation */}
      <div className="text-xs text-terminal-dim mb-8">
        <Link to="/blog" className="hover:text-terminal-green transition-colors">
          ← Back to blog
        </Link>
      </div>

      {/* Title block */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <Tag>{meta.category}</Tag>
          <Tag variant="cyan">{readTime} min read</Tag>
        </div>
        <h1 className="text-2xl md:text-4xl font-bold text-terminal-text mb-4">{meta.title}</h1>
        <p className="text-terminal-dim text-sm mb-6">{meta.summary}</p>

        <div className="border-t border-terminal-border mb-6" />

        {/* Italic intro with markdown link support */}
        {intro && (
          <div className="text-terminal-dim text-sm italic leading-relaxed [&_a]:text-terminal-cyan [&_a]:underline [&_a]:underline-offset-2 [&_a:hover]:text-terminal-green">
            <MarkdownRenderer content={intro} />
          </div>
        )}
      </div>

      <div className="border-t border-terminal-border mb-6" />
    </>
  )
}
