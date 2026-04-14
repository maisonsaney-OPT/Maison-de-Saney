import { useEffect } from 'react';

interface SeoHeadProps {
  title: string;
  description: string;
  canonicalPath?: string;
}

const ensureMeta = (name: string, selector: string) => {
  const existing = document.head.querySelector<HTMLMetaElement>(selector);
  if (existing) return existing;

  const meta = document.createElement('meta');
  meta.setAttribute('name', name);
  document.head.appendChild(meta);
  return meta;
};

export const SeoHead: React.FC<SeoHeadProps> = ({ title, description, canonicalPath }) => {
  useEffect(() => {
    const previousTitle = document.title;
    const descriptionMeta = ensureMeta('description', 'meta[name="description"]');
    const previousDescription = descriptionMeta.getAttribute('content') || '';
    const canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const previousCanonical = canonical?.getAttribute('href') || '';

    document.title = title;
    descriptionMeta.setAttribute('content', description);

    if (canonical && canonicalPath) {
      canonical.setAttribute('href', `https://maisondesaney.net${canonicalPath}`);
    }

    return () => {
      document.title = previousTitle;
      descriptionMeta.setAttribute('content', previousDescription);
      if (canonical && canonicalPath && previousCanonical) {
        canonical.setAttribute('href', previousCanonical);
      }
    };
  }, [title, description, canonicalPath]);

  return null;
};
