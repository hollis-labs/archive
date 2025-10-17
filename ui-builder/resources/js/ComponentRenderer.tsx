import { componentRegistry } from '@/components/ComponentRegistry'

interface ComponentRendererProps {
  config: any
  children?: React.ReactNode
}

export function ComponentRenderer({ config, children }: ComponentRendererProps) {
  console.log('ComponentRenderer: Rendering config:', config)
  
  if (!config || !config.type) {
    console.warn('ComponentRenderer: No config or config.type provided')
    return null
  }

  console.log('ComponentRenderer: Looking for component type:', config.type)
  const Component = componentRegistry.get(config.type)
  console.log('ComponentRenderer: Found component:', Component ? 'Yes' : 'No')

  if (!Component) {
    console.warn('ComponentRenderer: Unknown component type:', config.type)
    console.log('ComponentRenderer: Available types:', Array.from(componentRegistry.getAll().keys()))
    return (
      <div className="p-4 border border-yellow-500 bg-yellow-50 text-yellow-900 rounded">
        <strong>Unknown component type:</strong> {config.type}
        <br />
        <small>Component ID: {config.id}</small>
      </div>
    )
  }

  const ComponentWithChildren = Component as React.ComponentType<{
    config: any
    children?: React.ReactNode
  }>

  console.log('ComponentRenderer: Rendering component with config:', config)
  
  try {
    return <ComponentWithChildren config={config}>{children}</ComponentWithChildren>
  } catch (error) {
    console.error('ComponentRenderer: Error rendering component:', error)
    return (
      <div className="p-4 border border-red-500 bg-red-50 text-red-900 rounded">
        <strong>Error rendering component:</strong> {config.type}
        <br />
        <small>{error instanceof Error ? error.message : 'Unknown error'}</small>
      </div>
    )
  }
}
