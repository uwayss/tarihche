/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

export type SectionNavItem = {
  id: string
  title: string
}

type SectionRegistryApi = {
  sections: SectionNavItem[]
  registerSection: (item: SectionNavItem) => void
  clearSections: () => void
}

const SectionRegistryContext = createContext<SectionRegistryApi | null>(null)

export function SectionRegistryProvider(props: { children: ReactNode }) {
  const [sections, setSections] = useState<SectionNavItem[]>([])

  const registerSection = useCallback((item: SectionNavItem) => {
    setSections((prev) => {
      const existingIndex = prev.findIndex((s) => s.id === item.id)
      if (existingIndex === -1) {
        return [...prev, item]
      }

      const existing = prev[existingIndex]
      if (existing.title === item.title) return prev

      const next = [...prev]
      next[existingIndex] = item
      return next
    })
  }, [])

  const clearSections = useCallback(() => {
    setSections([])
  }, [])

  const value = useMemo<SectionRegistryApi>(
    () => ({ sections, registerSection, clearSections }),
    [sections, registerSection, clearSections],
  )

  return (
    <SectionRegistryContext.Provider value={value}>
      {props.children}
    </SectionRegistryContext.Provider>
  )
}

export function useSectionRegistry(): SectionRegistryApi {
  const ctx = useContext(SectionRegistryContext)
  if (!ctx) {
    throw new Error('useSectionRegistry must be used within SectionRegistryProvider')
  }
  return ctx
}
