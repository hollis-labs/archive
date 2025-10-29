import { useEffect, useState } from 'react'
import { ComponentRenderer } from './ComponentRenderer'
import type { PageConfig } from '@/types'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'

export interface PageData {
  config: PageConfig
}

export interface ShellPageProps {
  pageKey: string
  isAuthenticated?: boolean
  hasUsers?: boolean
  user?: any
}

export function ShellPage({ pageKey, isAuthenticated: _isAuthenticated, hasUsers: _hasUsers, user: _user }: ShellPageProps) {
  console.log('ShellPage: Mounting with pageKey:', pageKey)
  
  const [pageData, setPageData] = useState<PageData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(true)

  useEffect(() => {
    console.log('ShellPage: useEffect triggered for pageKey:', pageKey)
    loadPage()
  }, [pageKey])

  async function loadPage() {
    try {
      console.log('ShellPage: Starting to load page:', pageKey)
      setLoading(true)
      setError(null)

      const url = `/api/ui/pages/${pageKey}`
      console.log('ShellPage: Fetching from:', url)
      
      const response = await fetch(url)
      console.log('ShellPage: Response status:', response.status)

      if (!response.ok) {
        throw new Error(`Failed to load page: ${response.statusText}`)
      }

      const data = await response.json()
      console.log('ShellPage: Received data:', data)
      
      setPageData(data)
      console.log('ShellPage: Page data set successfully')
    } catch (err) {
      console.error('ShellPage: Failed to load page:', err)
      setError(err instanceof Error ? err.message : 'Failed to load page')
    } finally {
      setLoading(false)
      console.log('ShellPage: Loading complete')
    }
  }

  console.log('ShellPage: Current state:', { loading, error, hasPageData: !!pageData })

  if (loading) {
    console.log('ShellPage: Showing loading state')
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-gray-600">Loading...</div>
      </div>
    )
  }

  if (error) {
    console.log('ShellPage: Showing error state:', error)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-600">Error: {error}</div>
      </div>
    )
  }

  if (!pageData) {
    console.log('ShellPage: No page data found')
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-gray-600">Page not found</div>
      </div>
    )
  }

  // All pages should have a layout property
  if (!pageData.config.layout) {
    console.error('ShellPage: Page config missing layout property:', pageData.config)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-600">Invalid page configuration: missing layout</div>
      </div>
    )
  }

  console.log('ShellPage: Rendering layout:', pageData.config.layout)
  
  const content = <ComponentRenderer config={pageData.config.layout} />

  const overlay = pageData.config.overlay || 'page'

  // If overlay is modal but it's closed, unmount completely
  if (overlay === 'modal' && !isOpen) {
    return null
  }

  // If overlay is set to modal, wrap in a Dialog
  if (overlay === 'modal') {
    console.log('ShellPage: Rendering as modal with title:', pageData.config.title)
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl min-w-[56rem] min-h-[32rem] max-h-[80vh] overflow-y-auto">
          {pageData.config.title && (
            <DialogHeader>
              <DialogTitle>{pageData.config.title}</DialogTitle>
            </DialogHeader>
          )}
          <div className="mt-4">{content}</div>
        </DialogContent>
      </Dialog>
    )
  }

  // If overlay is set to sheet, wrap in a Sheet
  if (overlay === 'sheet') {
    console.log('ShellPage: Rendering as sheet with title:', pageData.config.title)
    if (!isOpen) {
      return null
    }
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
          {pageData.config.title && (
            <SheetHeader>
              <SheetTitle>{pageData.config.title}</SheetTitle>
            </SheetHeader>
          )}
          <div className="mt-4">{content}</div>
        </SheetContent>
      </Sheet>
    )
  }

  // Otherwise render directly as full page
  console.log('ShellPage: Rendering as full page')
  return (
    <div className="min-h-screen p-6">
      {pageData.config.title && <h1 className="text-2xl font-bold mb-6">{pageData.config.title}</h1>}
      {content}
    </div>
  )
}
