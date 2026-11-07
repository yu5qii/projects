'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getArticleById, NewsArticle } from '@/lib/newsData';
import { useMinimalStore } from '@/lib/store';
import { AiOverview } from '@/components/minimal/AiOverview';
import { UnzipSplitView } from '@/components/minimal/UnzipSplitView';
import { ShareArtifactModal } from '@/components/minimal/ShareArtifactModal';
import { ArrowLeft } from 'lucide-react';

export default function ArticleDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const currentArticle = useMinimalStore((state) => state.currentArticle);
  const setCurrentArticle = useMinimalStore((state) => state.setCurrentArticle);

  // Match from curated database or current active custom article in store
  const article: NewsArticle | undefined =
    getArticleById(id) || (currentArticle?.id === id ? currentArticle : undefined);

  useEffect(() => {
    if (article) {
      setCurrentArticle(article);
    }
  }, [article, setCurrentArticle]);

  if (!article) {
    return (
      <div style={{ maxWidth: '800px', margin: '6rem auto', padding: '0 2rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 400, marginBottom: '1.5rem', color: '#ffffff' }}>
          Dispatch Not Found
        </h1>
        <p style={{ color: '#88888e', marginBottom: '2.5rem' }}>
          The requested wire report could not be located in the current syndication index.
        </p>
        <Link
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.6rem 1.2rem',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            fontFamily: 'monospace',
            fontSize: '0.75rem',
            textTransform: 'uppercase',
            color: '#ffffff',
          }}
        >
          <ArrowLeft size={14} />
          <span>Return to Global News Hub</span>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <AiOverview article={article} />
      <UnzipSplitView article={article} />
      <ShareArtifactModal article={article} />
    </div>
  );
}
