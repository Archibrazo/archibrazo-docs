import type { MetadataRoute } from 'next';
import { getPageMap } from 'nextra/page-map';
import { site } from '@/lib/site';

interface PageMapNode {
  route?: string;
  children?: PageMapNode[];
  frontMatter?: Record<string, unknown>;
}

function collectRoutes(nodes: PageMapNode[], routes: Set<string>) {
  for (const node of nodes) {
    // Folders carry `children`; only entries with front matter are real pages.
    if (node.route && node.frontMatter) routes.add(node.route);
    if (node.children) collectRoutes(node.children, routes);
  }
}

// No `lastModified`: page timestamps come from git history, which is shallow
// on the build machine and would stamp every page with the same date.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = new Set<string>();
  collectRoutes((await getPageMap()) as PageMapNode[], routes);

  return [...routes].sort().map((route) => ({
    url: `${site.url}${route.split('/').map(encodeURIComponent).join('/')}`,
  }));
}
