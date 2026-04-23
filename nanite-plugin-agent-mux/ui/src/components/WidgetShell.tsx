import { useEffect, useState, type ReactNode } from 'react'
import { ChevronDown, ChevronRight, type LucideIcon } from 'lucide-react'

interface WidgetShellProps {
  id: string
  title: string
  icon: LucideIcon
  children: ReactNode
}

export function WidgetShell({ id, title, icon: Icon, children }: WidgetShellProps) {
  const storageKey = `mux-widget-${id}`

  const [minimized, setMinimized] = useState<boolean>(() => {
    try {
      return localStorage.getItem(storageKey) === 'minimized'
    } catch {
      return false
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, minimized ? 'minimized' : 'open')
    } catch {
      // ignore
    }
  }, [minimized, storageKey])

  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900/40">
      <button
        onClick={() => setMinimized((m) => !m)}
        aria-expanded={!minimized}
        className="flex items-center gap-2 w-full px-3 py-2.5 hover:bg-zinc-800/30 transition-colors rounded-t-lg"
      >
        <Icon className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
        <h3 className="text-xs font-medium text-zinc-400 uppercase tracking-wider flex-1 text-left">
          {title}
        </h3>
        {minimized ? (
          <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
        ) : (
          <ChevronDown className="w-3.5 h-3.5 text-zinc-600" />
        )}
      </button>
      {!minimized && <div className="px-3 pb-3">{children}</div>}
    </div>
  )
}
