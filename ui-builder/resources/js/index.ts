// Export all components
export * from './components'

// Export the main UI Builder components and utilities
export { ShellPage } from './ShellPage'
export { registerCoreComponents } from './registerCoreComponents'
export { ComponentRenderer } from './ComponentRenderer'

// Export component registration functions
export {
  registerPrimitiveComponents,
  registerLayoutComponents,
  registerNavigationComponents,
  registerCompositeComponents,
  registerAdvancedComponents,
  registerFormComponents,
} from './components/ComponentRegistry'

// Export command handler
export { commandHandler } from './components/CommandHandler'

// Export types
export * from './types'
