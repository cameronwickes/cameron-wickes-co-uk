/** Footer — site-wide copyright footer. */
export default function Footer() {
  return (
    <footer className="border-t border-terminal-border py-8 px-6">
      <div className="max-w-6xl mx-auto text-center text-xs text-terminal-dim">
        © {new Date().getFullYear()} Cameron Wickes. All rights reserved.
      </div>
    </footer>
  )
}
