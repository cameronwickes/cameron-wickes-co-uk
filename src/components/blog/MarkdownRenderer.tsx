/**
 * MarkdownRenderer — renders markdown content with prose styling.
 *
 * Wraps ReactMarkdown with GFM (tables, strikethrough) and raw HTML support.
 * Styled via the `.prose` class defined in index.css.
 */
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'

export default function MarkdownRenderer({ content }: { content: string }) {
  return (
    <div className="prose">
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
        {content}
      </ReactMarkdown>
    </div>
  )
}
