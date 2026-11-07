'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Share2, ArrowDown } from 'lucide-react';
import { NewsArticle } from '@/lib/newsData';
import { useMinimalStore } from '@/lib/store';
import styles from './AiOverview.module.scss';

interface AiOverviewProps {
  article: NewsArticle;
}

export const AiOverview: React.FC<AiOverviewProps> = ({ article }) => {
  const setExportModalOpen = useMinimalStore((state) => state.setExportModalOpen);

  return (
    <section className={styles.overviewSection}>
      {/* Top Navigation */}
      <div className={styles.navigationBar}>
        <Link href="/" className={styles.backLink}>
          <ArrowLeft size={13} />
          <span>All Dispatches</span>
        </Link>

        <div className={styles.actionsRight}>
          <button
            onClick={() => setExportModalOpen(true)}
            className={styles.exportButton}
            title="Export clean typographic summary for social sharing"
          >
            <Share2 size={12} />
            <span>Export Brief</span>
          </button>
        </div>
      </div>

      {/* Article Meta Header */}
      <div className={styles.metaHeader}>
        <span className={styles.categoryTag}>{article.category}</span>
        <span className={styles.metaDot}>/</span>
        <span>{article.region}</span>
        <span className={styles.metaDot}>/</span>
        <span>{article.publishedDate}</span>
        <span className={styles.metaDot}>/</span>
        <span>{article.readTime}</span>
      </div>

      {/* Main Headline */}
      <h1 className={styles.articleTitle}>{article.headline}</h1>

      {/* Centered AI Overview Card */}
      <div className={styles.aiOverviewCard}>
        <div className={styles.cardTop}>
          <div className={styles.aiBadge}>
            <span className={styles.aiIndicatorDot} />
            <span>AI Overview // Undeniable Fact Consensus</span>
          </div>
          <span className={styles.telemetryTag}>
            {article.aiOverview.modelInfo.model} • {article.aiOverview.modelInfo.quantization} • {article.aiOverview.modelInfo.latencyMs}ms
          </span>
        </div>

        <p className={styles.summaryText}>{article.aiOverview.summary}</p>

        <div className={styles.factsList}>
          {article.aiOverview.consensusFacts.map((fact, idx) => (
            <div key={idx} className={styles.factItem}>
              <span className={styles.factIndex}>0{idx + 1}</span>
              <p className={styles.factContent}>{fact}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Down Prompt */}
      <div className={styles.scrollPrompt}>
        <span>Scroll to unzip opposing perspectives</span>
        <ArrowDown size={14} />
      </div>
    </section>
  );
};
