import React, { createContext, useContext, ReactNode } from 'react'

interface FeatureFlagContextType {
  flags: Record<string, any>
  isFeatureEnabled: (flag: string) => boolean
}

const FeatureFlagContext = createContext<FeatureFlagContextType | undefined>(undefined)

interface FeatureFlagProviderProps {
  flags: Record<string, any>
  children: ReactNode
}

export function FeatureFlagProvider({ flags, children }: FeatureFlagProviderProps) {
  const isFeatureEnabled = (flag: string) => {
    return flags[flag] === true
  }

  return (
    <FeatureFlagContext.Provider value={{ flags, isFeatureEnabled }}>
      {children}
    </FeatureFlagContext.Provider>
  )
}

export function useFeatureFlags() {
  const context = useContext(FeatureFlagContext)
  if (context === undefined) {
    throw new Error('useFeatureFlags must be used within a FeatureFlagProvider')
  }
  return context
}