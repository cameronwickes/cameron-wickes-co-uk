/**
 * Blog — listing page with category filtering and animated post cards.
 *
 * Categories are dynamically derived from the blog index. Changing the
 * filter re-keys the grid to replay scroll-reveal animations.
 */
import { useState } from 'react'
import { blogIndex } from '../static/data/blog'
import ScrollReveal from '../components/effects/ScrollReveal'
import CategoryFilter from '../components/elements/CategoryFilter'
import BlogCard from '../components/blog/BlogCard'

/** Derive unique categories from blog posts, sorted alphabetically. */
const CATEGORIES = ['all', ...Array.from(new Set(blogIndex.map((p) => p.category))).sort()]

/** Stagger delay between card animations (ms). */
const CARD_STAGGER = 100

const TAGLINE = 'Writeups, research, and thoughts on software, security, and engineering.'

export default function Blog() {
  const [filter, setFilter] = useState('all')
  const posts = filter === 'all' ? blogIndex : blogIndex.filter((p) => p.category === filter)

  return (
    <div className="pt-14 min-h-screen">
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Page header */}
          <ScrollReveal>
            <h1 className="text-3xl md:text-5xl font-bold text-terminal-text mb-4">Blog</h1>
            <p className="text-terminal-dim text-sm mb-10 max-w-2xl">{TAGLINE}</p>
          </ScrollReveal>

          {/* Category filter buttons */}
          <ScrollReveal delay={200}>
            <CategoryFilter categories={CATEGORIES} active={filter} onChange={setFilter} />
          </ScrollReveal>

          {/* Post grid — re-keyed on filter change to replay animations */}
          <div key={filter} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, i) => (
              <ScrollReveal key={post.slug} delay={i * CARD_STAGGER}>
                <BlogCard post={post} />
              </ScrollReveal>
            ))}
          </div>

          {/* Empty state */}
          {posts.length === 0 && (
            <div className="text-center text-terminal-dim py-20 text-sm">No posts found for "{filter}".</div>
          )}
        </div>
      </section>
    </div>
  )
}
