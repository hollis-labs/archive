import type { ComponentConfig } from '../types'
import { ComponentRenderer } from '@/ComponentRenderer'

interface RowsLayoutProps {
  config: ComponentConfig & {
    children?: ComponentConfig[]
  }
}

export function RowsLayout({ config }: RowsLayoutProps) {
  console.log('RowsLayout: Rendering with config:', config)
  
  const children = config.children || []
  
  console.log('RowsLayout: Rendering', children.length, 'children')
  
  return (
    <div className="flex flex-col gap-4">
      {children.map((child, index) => {
        console.log(`RowsLayout: Rendering child ${index}:`, child)
        return <ComponentRenderer key={child.id || index} config={child} />
      })}
    </div>
  )
}
