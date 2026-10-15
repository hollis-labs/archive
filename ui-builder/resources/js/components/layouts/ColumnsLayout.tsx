import type { ComponentConfig } from '../types'
import { ComponentRenderer } from '@/ComponentRenderer'

interface ColumnsLayoutProps {
  config: ComponentConfig & {
    children?: ComponentConfig[]
  }
}

export function ColumnsLayout({ config }: ColumnsLayoutProps) {
  console.log('ColumnsLayout: Rendering with config:', config)
  
  const children = config.children || []
  
  console.log('ColumnsLayout: Rendering', children.length, 'children')
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {children.map((child, index) => {
        console.log(`ColumnsLayout: Rendering child ${index}:`, child)
        return <ComponentRenderer key={child.id || index} config={child} />
      })}
    </div>
  )
}
