/**
 * PostNotFound — 404 state shown when a blog post slug doesn't match any content.
 */
import { Link } from 'react-router-dom'

export default function PostNotFound() {
  return (
    <div className="pt-14 min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-terminal-text mb-2">404 — Post Not Found</h1>
        <p className="text-terminal-dim text-sm mb-6">This post doesn't exist.</p>
        <Link to="/blog" className="text-terminal-cyan hover:text-terminal-green text-sm underline">
          ← Back to blog
        </Link>
      </div>
    </div>
  )
}
