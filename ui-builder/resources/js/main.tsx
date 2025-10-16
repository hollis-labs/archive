import { createRoot } from 'react-dom/client'
import { ShellPage } from '.ShellPage'
import { registerCoreComponents } from './registerCoreComponents'
import {
  registerPrimitiveComponents,
  registerLayoutComponents,
  registerNavigationComponents,
  registerCompositeComponents,
  registerAdvancedComponents,
  registerFormComponents,
} from '@/componentsComponentRegistry'
import { commandHandler } from '@/componentsCommandHandler'

const rootElement = document.getElementById('-root')
if (!rootElement) {
  throw new Error('Root element not found')
}

const pageKey = rootElement.dataset.pageKey || ''
const isAuthenticated = rootElement.dataset.isAuthenticated === 'true'
const hasUsers = rootElement.dataset.hasUsers === 'true'
const user = isAuthenticated && rootElement.dataset.user 
  ? JSON.parse(rootElement.dataset.user) 
  : null

// Initialize the command handler (it auto-registers listeners)
console.log('Command handler initialized:', commandHandler)

registerCoreComponents()
registerPrimitiveComponents()
registerLayoutComponents()
registerNavigationComponents()
registerCompositeComponents()
registerAdvancedComponents()
registerFormComponents()

const root = createRoot(rootElement)
root.render(
  <ShellPage 
    pageKey={pageKey}
    isAuthenticated={isAuthenticated}
    hasUsers={hasUsers}
    user={user}
  />
)
