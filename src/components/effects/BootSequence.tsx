/**
 * BootSequence — terminal-style boot animation shown on first visit.
 * Displays a systemd-style boot log, then types a login prompt.
 * Progress bar tracks the current phase.
 */
import { useState, useEffect, useCallback } from 'react'

/** Boot log entries. Displayed sequentially with LINE_INTERVAL spacing. */
const BOOT_LINES = [
  'systemd[1]: Starting kernel...',
  '[OK] Started Journal Service',
  '[OK] Reached target Local File Systems',
  '[OK] Started Network Manager',
  '[OK] Reached target Network',
  '[OK] Started SSH Daemon',
  '[OK] Started Web Server (nginx)',
  '[OK] Reached target Multi-User System',
]

/** Prefix used to identify status lines. */
const OK_PREFIX = '[OK] '

/** Timing constants (ms). */
const LINE_INTERVAL = 150
const LOGIN_DELAY = 250
const TYPE_SPEED = 35

/** Login username displayed in the typing animation. */
const LOGIN_USER = 'cameronwickes'

/** Animation phases in order. */
type Phase = 'boot' | 'login' | 'typing' | 'done'

/** Renders a single boot log line, highlighting the [OK] prefix in green. */
function BootLine({ text }: { text: string }) {
  const isOk = text.startsWith(OK_PREFIX)
  return (
    <div className="text-terminal-text">
      {isOk ? (
        <>
          <span className="text-terminal-green">[ OK ] </span>
          {text.slice(OK_PREFIX.length)}
        </>
      ) : (
        <span className="text-terminal-dim">{text}</span>
      )}
    </div>
  )
}

export default function BootSequence() {
  const [visibleLines, setVisibleLines] = useState(0)
  const [phase, setPhase] = useState<Phase>('boot')
  const [typed, setTyped] = useState('')

  /** Runs the full boot → login → typing sequence with proper cleanup. */
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []
    const intervals: ReturnType<typeof setInterval>[] = []

    // Phase 1: Stagger boot lines, then transition to login.
    BOOT_LINES.forEach((_, i) => {
      timers.push(setTimeout(() => setVisibleLines(i + 1), i * LINE_INTERVAL))
    })

    const bootDuration = BOOT_LINES.length * LINE_INTERVAL

    // Phase 2: Show login prompt after boot completes.
    timers.push(setTimeout(() => setPhase('login'), bootDuration))

    // Phase 3: Start typing after a brief pause.
    timers.push(
      setTimeout(() => {
        setPhase('typing')
        let charIndex = 0
        const interval = setInterval(() => {
          setTyped(LOGIN_USER.slice(0, ++charIndex))
          if (charIndex >= LOGIN_USER.length) {
            clearInterval(interval)
            setPhase('done')
          }
        }, TYPE_SPEED)
        intervals.push(interval)
      }, bootDuration + LOGIN_DELAY),
    )

    return () => {
      timers.forEach(clearTimeout)
      intervals.forEach(clearInterval)
    }
  }, [])

  /** Calculate progress percentage based on current phase. */
  const getProgress = useCallback(() => {
    switch (phase) {
      case 'boot':
        return (visibleLines / BOOT_LINES.length) * 50
      case 'login':
        return 60
      case 'typing':
        return 60 + (typed.length / LOGIN_USER.length) * 40
      case 'done':
        return 100
    }
  }, [phase, visibleLines, typed])

  return (
    <div className="fixed inset-0 bg-terminal-bg z-50 flex items-center justify-center">
      <div className="w-full max-w-2xl px-6 font-mono text-sm leading-relaxed">
        {/* Boot log */}
        {BOOT_LINES.slice(0, visibleLines).map((text, i) => (
          <BootLine key={i} text={text} />
        ))}

        {/* Blinking cursor during boot phase */}
        {phase === 'boot' && <span className="inline-block w-2.5 h-5 bg-terminal-green cursor-blink mt-1" />}

        {/* Login prompt with typing animation */}
        {phase !== 'boot' && (
          <div className="mt-4 text-terminal-text">
            login:{' '}
            <span className="text-terminal-green">
              {typed}
              {phase === 'typing' && <span className="cursor-blink">▊</span>}
            </span>
          </div>
        )}

        {/* Progress bar */}
        <div className="mt-6 h-1 bg-terminal-border rounded-full overflow-hidden">
          <div
            className="h-full bg-terminal-green rounded-full transition-all duration-300 ease-out"
            style={{ width: `${getProgress()}%` }}
          />
        </div>
      </div>
    </div>
  )
}
