import React from 'react';
import { ArrowLeft, ArrowRight, Clock3 } from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { BLOG_POSTS, BLOG_POSTS_BY_SLUG } from '../../data/blogPosts';
import { SeoHead } from '../../components/SeoHead';

export const BlogArticlePage: React.FC = () => {
  const { slug } = useParams();

  if (!slug || !BLOG_POSTS_BY_SLUG[slug]) {
    return <Navigate to="/blog" replace />;
  }

  const post = BLOG_POSTS_BY_SLUG[slug];
  const relatedPosts = post.relatedSlugs
    .map((relatedSlug) => BLOG_POSTS_BY_SLUG[relatedSlug])
    .filter(Boolean);

  return (
    <div className="bg-saney-cream min-h-screen pt-24 pb-16">
      <SeoHead
        title={post.seoTitle}
        description={post.metaDescription}
        canonicalPath={`/blog/${post.slug}`}
      />

      <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-bold text-saney-dark hover:text-saney-gold transition-colors mb-8"
        >
          <ArrowLeft size={15} />
          Retour au blog
        </Link>

        <header className="bg-white border border-saney-beige shadow-sm overflow-hidden mb-12">
          <div className="h-[340px] overflow-hidden">
            <img src={post.heroImage} alt={post.heroAlt} className="w-full h-full object-cover" />
          </div>

          <div className="p-8 md:p-10 space-y-5">
            <div className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.2em] font-bold">
              <span className="text-saney-gold">{post.category}</span>
              <span className="inline-flex items-center gap-2 text-gray-400">
                <Clock3 size={14} />
                {post.readTime}
              </span>
              <span className="text-gray-400">{post.publishedAt}</span>
            </div>

            <h1 className="font-serif text-4xl md:text-5xl text-saney-dark leading-tight">{post.title}</h1>
            <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">{post.intro}</p>
          </div>
        </header>

        <div className="grid lg:grid-cols-[1fr_320px] gap-10 items-start">
          <div className="space-y-8">
            {post.sections.map((section) => (
              <section key={section.heading} className="bg-white border border-saney-beige shadow-sm p-8 space-y-4">
                <h2 className="font-serif text-3xl text-saney-dark">{section.heading}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="text-gray-700 leading-8">
                    {paragraph}
                  </p>
                ))}
                {section.bullets && (
                  <ul className="space-y-3 text-gray-700">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-3">
                        <span className="mt-2 h-2 w-2 rounded-full bg-saney-gold flex-shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            {post.faq && post.faq.length > 0 && (
              <section className="bg-white border border-saney-beige shadow-sm p-8 space-y-6">
                <h2 className="font-serif text-3xl text-saney-dark">FAQ</h2>
                {post.faq.map((item) => (
                  <div key={item.question} className="border-t border-gray-100 pt-6 first:border-t-0 first:pt-0">
                    <h3 className="font-semibold text-lg text-saney-dark mb-2">{item.question}</h3>
                    <p className="text-gray-700 leading-7">{item.answer}</p>
                  </div>
                ))}
              </section>
            )}

            {relatedPosts.length > 0 && (
              <section className="bg-saney-dark text-white p-8 md:p-10 space-y-6">
                <div>
                  <p className="text-saney-gold text-xs uppercase tracking-[0.2em] font-bold mb-2">Articles lies</p>
                  <h2 className="font-serif text-3xl">Continuer la lecture</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  {relatedPosts.map((relatedPost) => (
                    <Link
                      key={relatedPost.slug}
                      to={`/blog/${relatedPost.slug}`}
                      className="border border-white/15 p-5 hover:border-saney-gold transition-colors"
                    >
                      <p className="text-xs uppercase tracking-[0.2em] text-saney-gold font-bold mb-2">
                        {relatedPost.category}
                      </p>
                      <h3 className="font-serif text-2xl mb-3">{relatedPost.title}</h3>
                      <p className="text-white/70 text-sm leading-relaxed">{relatedPost.excerpt}</p>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>

          <aside className="space-y-6 lg:sticky lg:top-28">
            <div className="bg-white border border-saney-beige shadow-sm p-6">
              <p className="text-xs uppercase tracking-[0.2em] font-bold text-saney-gold mb-3">Angle local</p>
              <p className="text-sm text-gray-600 leading-relaxed">{post.localAngle}</p>
            </div>

            <div className="bg-white border border-saney-beige shadow-sm p-6">
              <p className="text-xs uppercase tracking-[0.2em] font-bold text-saney-gold mb-4">Liens internes</p>
              <div className="space-y-4">
                {post.internalLinks.map((item) => (
                  <Link key={item.href} to={item.href} className="block border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
                    <p className="font-semibold text-saney-dark mb-1">{item.label}</p>
                    <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-saney-cream border border-saney-beige p-6">
              <p className="text-xs uppercase tracking-[0.2em] font-bold text-saney-gold mb-3">Passer a l action</p>
              <p className="text-sm text-gray-600 leading-relaxed mb-5">
                Besoin d un conseil ou envie de reserver une prestation ? Maison Saney vous accueille a Beziers
                dans un univers premium, technique et sur mesure.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-bold text-saney-dark hover:text-saney-gold transition-colors"
              >
                Nous contacter
                <ArrowRight size={15} />
              </Link>
            </div>
          </aside>
        </div>
      </article>
    </div>
  );
};
