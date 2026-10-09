import Link from 'next/link'
import { useMDXComponents as getMDXComponents } from '@/mdx-components.js'

const Wrapper = getMDXComponents().wrapper

export default function NotFound() {
  return (
    <Wrapper toc={[]} metadata={{ title: 'Page not found', searchable: false }}>
      <div className="mx-auto max-w-2xl py-12 text-center">
        <h1 className="text-2xl">
          The page is not found, which means it's either coming soon or has moved. This is common on a living document with multiple authors. Try using the search bar or try again soon.
        </h1>
        <p className="mt-8">
          <Link href="/">← Home</Link>
        </p>
      </div>
    </Wrapper>
  )
}
