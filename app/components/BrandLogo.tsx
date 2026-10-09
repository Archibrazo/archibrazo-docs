'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { isLocale, site } from '@/lib/site'

/** Navbar lockup. Links to the docs home of the locale being read. */
export function BrandLogo() {
  const pathname = usePathname()
  const first = pathname?.split('/').filter(Boolean)[0]
  const locale = isLocale(first) ? first : 'en'

  return (
    <Link href={`/${locale}`} className="archi-brand" aria-label={site.name}>
      <Image
        src="/archibrazo-logo.png"
        width={40}
        height={40}
        alt=""
        priority
        className="archi-brand-mark"
      />
      <span className="archi-brand-name">{site.name}</span>
    </Link>
  )
}
