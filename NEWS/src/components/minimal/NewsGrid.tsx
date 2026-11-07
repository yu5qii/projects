'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Check } from 'lucide-react';
import { GLOBAL_NEWS_ARTICLES } from '@/lib/newsData';
import styles from './NewsGrid.module.scss';

export const NewsGrid: React.FC = () => {
  const featuredStory = GLOBAL_NEWS_ARTICLES.find((a) => a.featured) || GLOBAL_NEWS_ARTICLES[0];
  const gridStories = GLOBAL_NEWS_ARTICLES.filter((a) => a.id !== featuredStory.id);

  return (
    <div className={styles.container}>
      {/* Editorial Intro Banner */}
      <section className={styles.introSection}>
        <div className={styles.introLeft}>
          <span className={styles.siteTagline}>
            Anti-Echo Chamber News Reader // Ver. 2.0
          </span>
          <h1 className={styles.introTitle}>
            Unfiltered consensus. <span>Partisan omissions revealed.</span>
          </h1>
        </div>
        <div className={styles.introMeta}>
          <div>GLOBAL SYNDICATION INDEX</div>
          <div>UPDATED HOURLY // VERIFIED CONSENSUS</div>
        </div>
      </section>

      {/* Featured Lead Story */}
      <Link href={`/article/${featuredStory.id}`} className={styles.featuredStory}>
        <div className={styles.metaRow}>
          <span className={styles.categoryTag}>{featuredStory.category}</span>
          <span className={styles.metaDot}>/</span>
          <span className={styles.regionTag}>{featuredStory.region}</span>
          <span className={styles.metaDot}>/</span>
          <span className={styles.timeTag}>{featuredStory.timestamp}</span>
        </div>

        <h2 className={styles.featuredHeadline}>
          <span>{featuredStory.headline}</span>
          <ArrowUpRight size={28} className={styles.arrowIcon} />
        </h2>

        <p className={styles.featuredExcerpt}>{featuredStory.excerpt}</p>

        <div className={styles.sourceTransparency}>
          <span className={styles.consensusPill}>
            <Check size={12} />
            <span>AI Verified Consensus: {featuredStory.aiOverview.consensusFacts.length} Undeniable Facts</span>
          </span>
          <span className={styles.metaDot}>•</span>
          <span>Cross-examined across {featuredStory.sourceCount} international outlets</span>
        </div>
      </Link>

      {/* Section Header */}
      <div className={styles.sectionHeader}>
        <span className={styles.sectionTitle}>02. LATEST GLOBAL DISPATCHES</span>
        <span className={styles.sectionTitle}>SELECT STORY TO UNZIP PERSPECTIVES</span>
      </div>

      {/* 2-Column Curated Stories Grid */}
      <div className={styles.storiesGrid}>
        {gridStories.map((story) => (
          <Link
            key={story.id}
            href={`/article/${story.id}`}
            className={styles.storyItem}
          >
            <div className={styles.storyHeader}>
              <span className={styles.storyCategory}>{story.category}</span>
              <span className={styles.metaDot}>/</span>
              <span>{story.region}</span>
              <span className={styles.metaDot}>/</span>
              <span>{story.timestamp}</span>
            </div>

            <h3 className={styles.storyHeadline}>
              <span>{story.headline}</span>
              <ArrowUpRight size={18} className={styles.storyArrow} />
            </h3>

            <p className={styles.storyExcerpt}>{story.excerpt}</p>

            <div className={styles.storyFooter}>
              <span>{story.sourceCount} sources cross-examined</span>
              <span className={styles.readTime}>{story.readTime}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
