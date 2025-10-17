import { useEffect, useState } from 'react'
import { ComponentRenderer } from './ComponentRenderer'
import type { PageConfig } from '@/types'
import { FeatureFlagProvider } from '@/contexts/FeatureFlagContext'
import type { ComponentConfig } from '@/components/types'

export interface PageData {
  config: PageConfig
  featureFlags: Record<string, any>
}

export interface ShellPageProps {
  pageKey: string
  isAuthenticated?: boolean
  hasUsers?: boolean
  user?: any
}

export function ShellPage({ pageKey, isAuthenticated: _isAuthenticated, hasUsers: _hasUsers, user: _user }: ShellPageProps) {
  const [pageData, setPageData] = useState<PageData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadPage()
  }, [pageKey])

  async function loadPage() {
    try {
      setLoading(true)
      setError(null)

      
      // TODO: THIS IS NOT USED - CONFIRM AND REMOVE
      // Convert the key to a URL-safe format
      // Replaces :: with / for nested routes
      // const urlKey = pageKey.replace(/::/g, '/')

    
      // This should return the page configuration from your database
      // Expected response format:
      // { config: PageConfig, featureFlags: Record<string, any> }
      const response = await fetch(`/api/ui/pages/${pageKey}`)

      if (!response.ok) {
        throw new Error(`Failed to load page: ${response.statusText}`)
      }

      const data = await response.json()
      setPageData(data)
    } catch (err) {
      console.error('Failed to load page:', err)
      setError(err instanceof Error ? err.message : 'Failed to load page')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-gray-600">Loading...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-600">Error: {error}</div>
      </div>
    )
  }

  if (!pageData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-gray-600">Page not found</div>
      </div>
    )
  }

  const rootComponent: ComponentConfig = {
    id: 'root',
    type: 'page',
    props: {
      children: pageData.config.components
    }
  }

  return (
    <FeatureFlagProvider flags={pageData.featureFlags}>
      <ComponentRenderer config={rootComponent} />
    </FeatureFlagProvider>
  )
}