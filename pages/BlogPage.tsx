import React from 'react';
import { ArrowRight, Clock3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BLOG_POSTS } from '../data/blogPosts';
import { SeoHead } from '../components/SeoHead';

export const BlogPage: React.FC = () => {
  return (
    <div className="bg-saney-cream min-h-screen pt-24 pb-16">
      <SeoHead
        title="Blog Onglerie & Formation a Beziers | Maison Saney"
        description="Conseils onglerie, BIAB, manucure russe, inspiration mariage, vacances et questions formation a Beziers par Maison Saney."
        canonicalPath="/blog"
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center mb-14">
          <div className="space-y-6">
            <p className="text-saney-gold text-sm font-bold tracking-[0.2em] uppercase">Blog</p>
            <h1 className="font-serif text-4xl md:text-6xl text-saney-dark leading-tight">
              Le journal SEO de Maison Saney
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
              Retrouvez nos articles autour de l onglerie premium, de la tenue, des techniques, des inspirations
              saisonnieres et des questions de formation a Beziers.
            </p>
          </div>

          <div className="bg-white border border-saney-beige shadow-sm p-8">
            <p className="text-xs uppercase tracking-[0.2em] text-saney-gold font-bold mb-3">Strategie locale</p>
            <p className="text-gray-600 leading-relaxed">
              Chaque article renforce un angle local ou une intention de recherche utile : prise de rendez-vous,
              reassurance technique, inspiration evenementielle ou projet de formation.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.slug}
              className="group bg-white border border-saney-beige overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="h-72 overflow-hidden">
                <img
                  src={post.heroImage}
                  alt={post.heroAlt}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div className="p-8 space-y-5">
                <div className="flex items-center gap-4 text-xs uppercase tracking-[0.2em] font-bold">
                  <span className="text-saney-gold">{post.category}</span>
                  <span className="inline-flex items-center gap-2 text-gray-400">
                    <Clock3 size={14} />
                    {post.readTime}
                  </span>
                </div>

                <div>
                  <h2 className="font-serif text-3xl text-saney-dark mb-3 leading-tight">{post.title}</h2>
                  <p className="text-gray-600 leading-relaxed">{post.excerpt}</p>
                </div>

                <div className="bg-saney-cream/70 border border-saney-beige/80 p-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-saney-gold font-bold mb-2">Angle SEO</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{post.localAngle}</p>
                </div>

                <Link
                  to={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 text-saney-dark font-semibold uppercase tracking-[0.2em] text-xs hover:text-saney-gold transition-colors"
                >
                  Lire l article
                  <ArrowRight size={15} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};
