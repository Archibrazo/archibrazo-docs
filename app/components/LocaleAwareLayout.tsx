'use client'

import { usePathname } from 'next/navigation'
import { Layout } from 'nextra-theme-docs'
import { ReactNode, useEffect, useMemo } from 'react'
import { DEFAULT_LOCALE, isLocale } from '@/lib/site'

interface LocaleAwareLayoutProps {
  children: ReactNode
  navbar: ReactNode
  footer: ReactNode
  fullPageMap: any[]
  docsRepositoryBase: string
}

export function LocaleAwareLayout({
  children,
  navbar,
  footer,
  fullPageMap,
  docsRepositoryBase,
}: LocaleAwareLayoutProps) {
  const pathname = usePathname()

  const locale = useMemo(() => {
    const segments = pathname?.split('/').filter(Boolean) || []
    const first = segments[0]
    return isLocale(first) ? first : DEFAULT_LOCALE
  }, [pathname])

  // The root layout renders one <html lang> for every route; keep it in step
  // with the locale actually being read.
  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  const pageMap = useMemo(() => {
    const folder = fullPageMap.find(
      (page: any) =>
        page.route === `/${locale}` ||
        page.route === `/${locale}/` ||
        page.name === locale
    )
    const raw = folder?.children
    const list = Array.isArray(raw) ? raw.filter(Boolean) : []
    // nextra-theme-docs `normalizePages` requires a non-empty list (`list[0]` is read).
    if (list.length > 0) return list
    const enFolder = fullPageMap.find(
      (page: any) => page.route === '/en' || page.route === '/en/' || page.name === 'en'
    )
    const enList = Array.isArray(enFolder?.children) ? enFolder!.children.filter(Boolean) : []
    if (enList.length > 0) return enList
    return fullPageMap.filter(Boolean)
  }, [fullPageMap, locale])

  return (
    <Layout
      navbar={navbar}
      pageMap={pageMap}
      docsRepositoryBase={docsRepositoryBase}
      footer={footer}
      sidebar={{ autoCollapse: true, defaultMenuCollapseLevel: 1 }}
      editLink={null}
      // The repository has issues disabled, so there is nowhere to send feedback yet.
      feedback={{ content: null }}
      // The brand is dark only: no theme switch, no light mode.
      darkMode={false}
      nextThemes={{ defaultTheme: 'dark', forcedTheme: 'dark' }}
    >
      {children}
    </Layout>
  )
}
