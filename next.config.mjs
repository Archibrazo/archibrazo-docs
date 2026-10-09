import nextra from 'nextra'

const withNextra = nextra({
  latex: true,
  search: {
    codeblocks: false,
  },
  defaultShowCopyCode: true,
})

export default withNextra({
  reactStrictMode: true,
  outputFileTracingExcludes: {
    // Match all app/page and API routes — `/api/*` misses nested paths like `/api/pages/snapshot`.
    '*': ['.git/**', '.git/objects/**', '.git/objects/pack/**'],
  },
  outputFileTracingIncludes: {
    '/api/pages/snapshot': ['./data/pages-snapshot.json'],
    '*': ['./data/protocols-snapshot.json'],
  },
  async redirects() {
    return [
      {
        // The site opens in Spanish (DEFAULT_LOCALE in lib/site.ts).
        source: '/',
        destination: '/es',
        permanent: false,
      },
      {
        // Former placeholder page; its text now lives in "Sobre Prisma".
        source: '/es/segunda-pagina',
        destination: '/es/prisma',
        permanent: true,
      },
      {
        source: '/pitch',
        destination: '/en/context-narrative/decks/2026/1',
        permanent: false,
      },
    ]
  },
})
