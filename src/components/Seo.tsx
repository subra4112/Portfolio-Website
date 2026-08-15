import { useEffect } from 'react'

const BASE = 'https://portfolio-website-five-ashy-63.vercel.app'

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  const selector = `meta[${attr}="${key}"]`
  let el = document.head.querySelector<HTMLMetaElement>(selector)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.rel = 'canonical'
    document.head.appendChild(el)
  }
  el.href = href
}

export interface SeoProps {
  title: string
  description: string
  /** Route path, e.g. "/projects". Used for canonical + og:url. */
  path: string
}

/**
 * Per-route document metadata. Each page needs its own title, description and
 * canonical URL so search engines can index the sections independently —
 * which is the prerequisite for sitelinks.
 */
export default function Seo({ title, description, path }: SeoProps) {
  useEffect(() => {
    const url = `${BASE}${path}`
    document.title = title
    upsertMeta('name', 'description', description)
    upsertMeta('property', 'og:title', title)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'twitter:title', title)
    upsertMeta('property', 'twitter:description', description)
    upsertCanonical(url)
  }, [title, description, path])

  return null
}
