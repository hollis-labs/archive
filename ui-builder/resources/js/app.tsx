import { createRoot } from 'react-dom/client'
import { ShellPage } from './ShellPage'
import { Toaster } from 'sonner'

declare global {
  interface Window {
    __BOOT__?: {
      isAuthenticated: boolean
      hasUsers: boolean
      user: { id: number; name: string; email: string } | null
      pageKey: string
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const boot = window.__BOOT__
  const rootEl = document.getElementById('UI-Builder-root')

  if (!boot || !rootEl) {
    console.warn('UI-Builder boot data or root element not found')
    return
  }

  if (!boot.isAuthenticated) {
    console.warn('User not authenticated')
    rootEl.innerHTML = '<div class="p-4 text-red-500">Authentication required</div>'
    return
  }

  const pageKey = rootEl.dataset.pageKey || boot.pageKey

  if (!pageKey) {
    console.error('No page key provided')
    rootEl.innerHTML = '<div class="p-4 text-red-500">No page key specified</div>'
    return
  }

  createRoot(rootEl).render(
    <>
      <ShellPage pageKey={pageKey} />
      <Toaster />
    </>
  )
})
