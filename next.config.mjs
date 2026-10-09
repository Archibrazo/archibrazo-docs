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
        source: '/pitch',
        destination: '/en/context-narrative/decks/2026/1',
        permanent: false,
      },
      {
        // Address of a page that is no longer published. It is cited as the
        // Archibrazo docs link in the Catalyst milestone evidence (project
        // 1400100), so it has to keep landing on the site.
        source: '/es/00%20-%20Home',
        destination: '/es',
        permanent: false,
      },
    ]
  },
})
