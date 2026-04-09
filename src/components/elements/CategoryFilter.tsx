/**
 * CategoryFilter — horizontal row of toggle buttons for filtering content.
 *
 * Highlights the active category in green. Generic enough to be used
 * for any string-based filter, not just blog categories.
 */

interface CategoryFilterProps {
  /** Available filter options (e.g. ['all', 'software', 'cybersecurity']). */
  categories: string[]
  /** Currently selected category. */
  active: string
  /** Callback when a category is selected. */
  onChange: (cat: string) => void
}

export default function CategoryFilter({ categories, active, onChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-12">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`px-3 py-1.5 text-xs rounded-lg border transition-colors ${
            active === cat
              ? 'bg-terminal-green text-terminal-bg border-terminal-green'
              : 'border-terminal-border text-terminal-dim hover:border-terminal-green hover:text-terminal-green'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}
