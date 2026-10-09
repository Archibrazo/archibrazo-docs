import type { Metadata } from 'next';
import { importPage } from 'nextra/pages';
import { isLocale, site, type Locale } from '@/lib/site';

const DESCRIPTION_MAX = 160;
const DESCRIPTION_MIN = 40;

function safeDecode(segment: string): string {
  try {
    return decodeURIComponent(segment);
  } catch {
    return segment;
  }
}

function humanize(segment: string): string {
  const text = segment.replace(/[-_]+/g, ' ').trim();
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * Title for a page. Nextra falls back to the file name when a page has no
 * title of its own, which yields "Index" for folder landing pages and bare
 * numbers for numbered series; both repeat across the site, so name those
 * pages after where they live instead.
 */
function resolveTitle(
  metadata: { title?: string | null; sidebarTitle?: string | null } | undefined,
  segments: string[],
): string | undefined {
  const title = metadata?.title?.trim() || undefined;
  const trail = segments.slice(1); // without the locale
  if (!title || trail.length === 0) return title;

  if (title.toLowerCase() === 'index') {
    return metadata?.sidebarTitle?.trim() || humanize(trail[trail.length - 1]);
  }
  if (/^\d+$/.test(title)) {
    return trail.slice(-3).map(humanize).join(' / ');
  }
  return title;
}

/**
 * First readable paragraph of an MDX/Markdown source, as plain text.
 * Gives every page its own meta description when the front matter has none.
 */
export function excerptFromSource(source: string | undefined): string | undefined {
  if (!source) return undefined;

  const text = source
    .replace(/^---\r?\n[\s\S]*?\r?\n---\s*/, '') // front matter
    .replace(/```[\s\S]*?```/g, '') // fenced code
    .replace(/^\s*(import|export)\s.*$/gm, '') // ESM lines
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '') // images
    .replace(/\[\[[^\]|]*\|([^\]]*)\]\]/g, '$1') // [[target|label]]
    .replace(/\[\[([^\]]*)\]\]/g, '$1') // [[target]]
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // [label](url)
    .replace(/<[^>]*>/g, '') // JSX / HTML tags
    .replace(/\{[^{}]*\}/g, '') // JSX expressions
    .replace(/^\s*#{1,6}\s.*$/gm, '') // headings
    .replace(/^\s*\|.*$/gm, '') // table rows
    .replace(/^\s*([-*_])\1{2,}\s*$/gm, '') // horizontal rules
    .replace(/^\s*>\s?/gm, '') // blockquote markers
    .replace(/^\s*(?:[-*+]|\d+\.)\s+/gm, '') // list markers
    .replace(/[*_`~]/g, ''); // emphasis

  const paragraph = text
    .split(/\r?\n\s*\r?\n/)
    .map((block) => block.replace(/\s+/g, ' ').trim())
    .find((block) => block.length >= DESCRIPTION_MIN);

  if (!paragraph) return undefined;
  if (paragraph.length <= DESCRIPTION_MAX) return paragraph;

  const cut = paragraph.slice(0, DESCRIPTION_MAX - 1);
  const lastSpace = cut.lastIndexOf(' ');
  return `${(lastSpace > DESCRIPTION_MIN ? cut.slice(0, lastSpace) : cut).replace(/[\s,;:.·—–-]+$/, '')}…`;
}

/**
 * Metadata for one docs page: its own title, description, canonical URL and
 * social tags. Called from the page route, which is the only place that knows
 * the path — the root layout does not receive catch-all params.
 */
export async function generatePageMetadata(mdxPath: string[] | undefined): Promise<Metadata> {
  const segments = (mdxPath ?? []).filter(Boolean).map(safeDecode);
  const locale: Locale = isLocale(segments[0]) ? segments[0] : 'en';
  const isLocaleRoot = segments.length <= 1;

  const page = await importPage(mdxPath);
  const pageTitle = resolveTitle(page.metadata, segments);
  const frontMatterDescription: string | undefined = page.metadata?.description || undefined;

  // Locale home pages describe the site; inner pages describe themselves.
  const description =
    frontMatterDescription ||
    (isLocaleRoot ? undefined : excerptFromSource(page.sourceCode)) ||
    site.description[locale];
  const canonical = `/${segments.map(encodeURIComponent).join('/')}`;
  const socialTitle = isLocaleRoot || !pageTitle ? site.title : `${pageTitle} · ${site.name}`;

  return {
    // Locale roots get the site title; inner pages go through the layout's title template.
    title: isLocaleRoot || !pageTitle ? { absolute: site.title } : pageTitle,
    description,
    alternates: { canonical },
    openGraph: {
      title: socialTitle,
      description,
      url: canonical,
      siteName: site.name,
      locale: site.ogLocale[locale],
      type: 'website',
      images: [site.ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: socialTitle,
      description,
      images: [site.ogImage.url],
    },
  };
}
