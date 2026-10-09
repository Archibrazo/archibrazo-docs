/**
 * Brand and site identity for this deployment.
 *
 * Everything that names the organisation, links to its channels or describes
 * the site lives here, so re-branding (or re-syncing with upstream) touches
 * one file instead of the layout, the metadata helpers and the SEO routes.
 */

export const LOCALES = ['en', 'es', 'pt'] as const;
export type Locale = (typeof LOCALES)[number];

export function isLocale(value: string | undefined): value is Locale {
  return !!value && (LOCALES as readonly string[]).includes(value);
}

export const site = {
  /** Organisation name, used in titles, the navbar and the footer. */
  name: 'El Archibrazo',
  /** Title of the site root and fallback when a page has no title of its own. */
  title: 'El Archibrazo · Documentación',
  /** Canonical origin, without a trailing slash. */
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://docs.archibrazo.org').replace(/\/+$/, ''),
  /** Social share image, relative to `public/`. */
  ogImage: { url: '/og-archibrazo.png', width: 1200, height: 630 },
  /** Fallback meta description per locale, used when a page has none. */
  description: {
    en: 'Documentation from El Archibrazo, a cooperative cultural centre in Almagro, Buenos Aires.',
    es: 'Documentación de El Archibrazo, centro cultural cooperativo en Almagro, Buenos Aires.',
    pt: 'Documentação de El Archibrazo, centro cultural cooperativo em Almagro, Buenos Aires.',
  } satisfies Record<Locale, string>,
  /** Open Graph locale codes. */
  ogLocale: { en: 'en_US', es: 'es_AR', pt: 'pt_BR' } satisfies Record<Locale, string>,
  links: {
    home: 'https://archibrazo.org',
    instagram: 'https://www.instagram.com/archibrazo',
    youtube: 'https://www.youtube.com/@ArchiBrazoOficial',
    /** Repository behind this site. */
    repository: 'https://github.com/Archibrazo/archibrazo-docs',
  },
  footer: {
    tagline: 'Centro Cultural Cooperativo',
    address: 'Mario Bravo 441, Almagro, CABA',
  },
} as const;
