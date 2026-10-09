import { Footer, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components';
import { getPageMap } from 'nextra/page-map';
import 'nextra-theme-docs/style.css';
import 'katex/dist/katex.min.css';
import '@/styles.css';
import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Analytics } from "@vercel/analytics/react";
import { FaInstagram, FaYoutube } from "react-icons/fa";
import { AuthProvider } from '@/contexts/AuthContext';
import { site } from '@/lib/site';
import { LocaleAwareLayout } from './components/LocaleAwareLayout';
import { LanguageSelector } from './components/LanguageSelector';
import { BrandLogo } from './components/BrandLogo';

// Site-wide defaults. Each page adds its own title, description and canonical
// URL in `app/[[...mdxPath]]/page.jsx`.
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s · ${site.name}` },
  description: site.description.es,
  applicationName: site.name,
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  openGraph: {
    title: site.title,
    description: site.description.es,
    url: '/',
    siteName: site.name,
    type: 'website',
    images: [site.ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: site.title,
    description: site.description.es,
    images: [site.ogImage.url],
  },
};

const iconClasses = "w-5 h-5 text-gray-400 transition-all duration-300 hover:scale-110 hover:text-prisma-a";

const navbar = (
  <Navbar
    logo={<BrandLogo />}
    logoLink={false}
    children={
      <div className="inline-flex items-center gap-4">
        <a href={site.links.home} target="_blank" rel="noopener noreferrer" className="archi-nav-link max-md:hidden">
          archibrazo.org
        </a>
        <a href={site.links.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <FaInstagram className={iconClasses} />
        </a>
        <a href={site.links.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube">
          <FaYoutube className={iconClasses} />
        </a>
        <LanguageSelector />
      </div>
    }
  />
);

const footer = (
  <Footer>
    <div className="archi-footer">
      <span>
        <strong>{site.name}</strong> © {new Date().getFullYear()} · {site.footer.tagline}
      </span>
      <span>
        {site.footer.address} ·{' '}
        <a href={site.links.home} target="_blank" rel="noopener noreferrer">archibrazo.org</a>
      </span>
    </div>
  </Footer>
);

export default async function RootLayout({ children }: { children: ReactNode }) {
  const fullPageMap = await getPageMap();

  return (
    // `lang` is the build-time default; LocaleAwareLayout syncs it to the
    // locale in the URL, which this layout cannot see.
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head
        color={{ hue: 340, saturation: 100, lightness: 62 }}
        backgroundColor={{ dark: '#0a0a0a', light: '#0a0a0a' }}
      >
        <link rel="preload" href="/fonts/Montserrat-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/BreeSerif-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </Head>
      <body>
        <AuthProvider>
          <LocaleAwareLayout
            navbar={navbar}
            footer={footer}
            fullPageMap={fullPageMap}
            docsRepositoryBase={site.links.repository}
          >
            {children}
            <Analytics />
          </LocaleAwareLayout>
        </AuthProvider>
      </body>
    </html>
  );
}
