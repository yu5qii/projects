'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { CheckCircle2, AlertTriangle, ShieldCheck, ExternalLink } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import styles from './ConsensusDashboard.module.scss';

export const ConsensusDashboard: React.FC = () => {
  const results = useAppStore((state) => state.results);
  const containerRef = useRef<HTMLDivElement>(null);
  const factsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!results || !containerRef.current) return;

    // Kinetic slam-in animation using GSAP for facts cards
    const cards = containerRef.current.querySelectorAll(`.${styles.factCard}`);
    gsap.fromTo(
      cards,
      {
        opacity: 0,
        y: 35,
        scale: 0.94,
        rotateX: -15,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        stagger: 0.06,
        duration: 0.6,
        ease: 'back.out(1.4)',
      }
    );
  }, [results]);

  if (!results) return null;

  const { topic, sourceA, sourceB, consensus, leftOutByA, leftOutByB } = results;

  return (
    <div ref={containerRef} className={styles.dashboardContainer}>
      {/* Topic & Source Comparison */}
      <div className={styles.topicBanner}>
        <div className={styles.topicInfo}>
          <span className={styles.topicLabel}>Synthesized Consensus Topic</span>
          <h2 className={styles.topicHeading}>{topic}</h2>
        </div>
      </div>

      <div className={styles.sourcesComparison}>
        {/* Source A */}
        <div
          className={`${styles.sourceCard} ${styles.sourceLeft}`}
          data-cursor-target="biased"
          data-bias-lean={`${sourceA.publisher} // ${sourceA.bias} (${sourceA.biasScore})`}
        >
          <div className={styles.sourceHeader}>
            <span className={styles.publisherName}>{sourceA.publisher}</span>
            <span className={`${styles.biasBadge} ${styles.badgeLeft}`}>
              {sourceA.bias} {sourceA.biasScore > 0 ? `+${sourceA.biasScore}` : sourceA.biasScore}
            </span>
          </div>
          <h3 className={styles.sourceTitle}>{sourceA.title}</h3>
          <p className={styles.sourceSummary}>{sourceA.summary}</p>
          <a
            href={sourceA.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', display: 'inline-flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}
            data-cursor-target="interactive"
          >
            <span>Original Article</span>
            <ExternalLink size={12} />
          </a>
        </div>

        <div className={styles.vsDivider}>VS</div>

        {/* Source B */}
        <div
          className={`${styles.sourceCard} ${styles.sourceRight}`}
          data-cursor-target="biased"
          data-bias-lean={`${sourceB.publisher} // ${sourceB.bias} (+${sourceB.biasScore})`}
        >
          <div className={styles.sourceHeader}>
            <span className={styles.publisherName}>{sourceB.publisher}</span>
            <span className={`${styles.biasBadge} ${styles.badgeRight}`}>
              {sourceB.bias} +{sourceB.biasScore}
            </span>
          </div>
          <h3 className={styles.sourceTitle}>{sourceB.title}</h3>
          <p className={styles.sourceSummary}>{sourceB.summary}</p>
          <a
            href={sourceB.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: '0.75rem', color: 'var(--accent-magenta)', display: 'inline-flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}
            data-cursor-target="interactive"
          >
            <span>Opposing Counterpart</span>
            <ExternalLink size={12} />
          </a>
        </div>
      </div>

      {/* Three Column Output */}
      <div ref={factsRef} className={styles.threeColumnsGrid}>
        {/* Column 1: Omitted by Source A */}
        <div className={`${styles.column} ${styles.leftOmittedColumn}`}>
          <div className={styles.columnHeader}>
            <span className={styles.columnTag}>Blindspot Analysis</span>
            <h3 className={styles.columnTitle}>Omitted by Source A</h3>
          </div>
          <div className={styles.factsList}>
            {leftOutByA.map((fact, index) => (
              <div
                key={index}
                className={styles.factCard}
                data-cursor-target="biased"
                data-bias-lean="OMITTED FACT // SOURCE A CONCEALED"
              >
                <div className={styles.factHeader}>
                  <AlertTriangle size={13} color="var(--accent-magenta)" />
                  <span>Omitted by {sourceA.publisher}</span>
                </div>
                <p>{fact}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Column 2: The Consensus (Centerpiece) */}
        <div className={`${styles.column} ${styles.consensusColumn}`}>
          <div className={styles.columnHeader}>
            <span className={styles.columnTag}>Undeniable Shared Ground</span>
            <h3 className={styles.columnTitle}>
              <ShieldCheck size={22} color="var(--accent-emerald)" />
              The Consensus Facts
            </h3>
          </div>
          <div className={styles.factsList}>
            {consensus.map((fact, index) => (
              <div
                key={index}
                className={styles.factCard}
                data-cursor-target="consensus"
              >
                <div className={styles.factHeader}>
                  <CheckCircle2 size={14} color="var(--accent-emerald)" />
                  <span>Verified Cross-Publication Fact #{index + 1}</span>
                </div>
                <p>{fact}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Column 3: Omitted by Source B */}
        <div className={`${styles.column} ${styles.rightOmittedColumn}`}>
          <div className={styles.columnHeader}>
            <span className={styles.columnTag}>Blindspot Analysis</span>
            <h3 className={styles.columnTitle}>Omitted by Source B</h3>
          </div>
          <div className={styles.factsList}>
            {leftOutByB.map((fact, index) => (
              <div
                key={index}
                className={styles.factCard}
                data-cursor-target="biased"
                data-bias-lean="OMITTED FACT // SOURCE B CONCEALED"
              >
                <div className={styles.factHeader}>
                  <AlertTriangle size={13} color="var(--accent-cyan)" />
                  <span>Omitted by {sourceB.publisher}</span>
                </div>
                <p>{fact}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
