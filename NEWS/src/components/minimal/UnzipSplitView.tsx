'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Minus, Plus, AlertCircle, CheckCircle, Split } from 'lucide-react';
import { NewsArticle } from '@/lib/newsData';
import { useMinimalStore, PerspectiveTab } from '@/lib/store';
import styles from './UnzipSplitView.module.scss';

interface UnzipSplitViewProps {
  article: NewsArticle;
}

export const UnzipSplitView: React.FC<UnzipSplitViewProps> = ({ article }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const seamRef = useRef<HTMLDivElement>(null);

  const activeTab = useMinimalStore((state) => state.activeTab);
  const setActiveTab = useMinimalStore((state) => state.setActiveTab);

  const [unzipProgress, setUnzipProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Desktop GSAP Unzipping Animation on Scroll
  useEffect(() => {
    if (isMobile) return;

    const container = containerRef.current;
    const leftCol = leftColRef.current;
    const rightCol = rightColRef.current;
    const seam = seamRef.current;

    if (!container || !leftCol || !rightCol) return;

    // Initial state: single unified center seam
    gsap.set(leftCol, { x: 30, opacity: 0.85 });
    gsap.set(rightCol, { x: -30, opacity: 0.85 });

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate progress as container enters viewport
      const start = windowHeight * 0.9;
      const end = windowHeight * 0.2;

      let progress = (start - rect.top) / (start - end);
      progress = Math.max(0, Math.min(1, progress));
      setUnzipProgress(Math.round(progress * 100));

      // GSAP smooth lerp to split 50/50
      gsap.to(leftCol, {
        x: (1 - progress) * 40,
        opacity: 0.4 + progress * 0.6,
        duration: 0.4,
        ease: 'power2.out',
      });

      gsap.to(rightCol, {
        x: -(1 - progress) * 40,
        opacity: 0.4 + progress * 0.6,
        duration: 0.4,
        ease: 'power2.out',
      });

      if (seam) {
        gsap.to(seam, {
          scaleY: progress,
          duration: 0.3,
          transformOrigin: 'top center',
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Trigger initial position

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMobile]);

  const { leftPerspective, rightPerspective, aiOverview } = article;

  return (
    <section ref={containerRef} className={styles.splitSection}>
      {/* Mobile Sticky Tab Navigation Bar */}
      <div className={styles.mobileStickyTabs}>
        <button
          onClick={() => setActiveTab('left')}
          className={`${styles.mobileTabButton} ${activeTab === 'left' ? styles.mobileTabActive : ''}`}
        >
          Left Leaning
        </button>
        <button
          onClick={() => setActiveTab('overview')}
          className={`${styles.mobileTabButton} ${activeTab === 'overview' ? styles.mobileTabActive : ''}`}
        >
          AI Overview
        </button>
        <button
          onClick={() => setActiveTab('right')}
          className={`${styles.mobileTabButton} ${activeTab === 'right' ? styles.mobileTabActive : ''}`}
        >
          Right Leaning
        </button>
      </div>

      {/* Desktop Unzipping Status Bar */}
      {/* <div className={styles.unzipHeader}>
        <div className={styles.unzipStatus}>
          <Split size={14} className={styles.seamIcon} />
          <span>Perspective Split-Screen // {unzipProgress}% Unzipped</span>
        </div>
        <div className={styles.unzipStatus}>
          <span>Synchronized 50/50 Comparative View</span>
        </div>
      </div> */}

      {/* Vertical Seam Divider */}
      <div ref={seamRef} className={styles.seamLineContainer} />

      {/* Main Content Area */}
      {isMobile ? (
        // Mobile View: Render tab-switched view
        <div className={styles.columnsContainer}>
          {activeTab === 'left' && (
            <div className={styles.column}>
              <div className={styles.columnEyebrow}>
                <span className={`${styles.perspectiveLabel} ${styles.labelLeft}`}>
                  Left-Leaning Perspective
                </span>
                <span className={styles.sourceTags}>
                  Sourced from: {leftPerspective.sources.join(', ')}
                </span>
              </div>

              <h2 className={styles.perspectiveHeadline}>{leftPerspective.headline}</h2>

              <div className={styles.framingSection}>
                <span className={styles.sectionSubhead}>Framing Narrative</span>
                <p className={styles.framingText}>{leftPerspective.framing}</p>
              </div>

              <div className={styles.factsGroup}>
                <div className={styles.factBlock}>
                  <div className={`${styles.blockTitle} ${styles.titleEmphasized}`}>
                    <CheckCircle size={13} color="var(--accent-left)" />
                    <span>Emphasized Focus Points</span>
                  </div>
                  <div className={styles.pointsList}>
                    {leftPerspective.highlightedFacts.map((fact, idx) => (
                      <div key={idx} className={styles.pointItem}>
                        <span className={styles.bulletSymbol}>+</span>
                        <p>{fact}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={styles.factBlock}>
                  <div className={`${styles.blockTitle} ${styles.titleOmitted}`}>
                    <AlertCircle size={13} color="#ef4444" />
                    <span>Omitted Facts (Blindspots)</span>
                  </div>
                  <div className={styles.pointsList}>
                    {leftPerspective.omittedFacts.map((fact, idx) => (
                      <div key={idx} className={styles.pointItem}>
                        <span className={`${styles.bulletSymbol} ${styles.omittedBullet}`}>—</span>
                        <p>{fact}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'overview' && (
            <div className={styles.mobileOverviewView}>
              <div className={styles.columnEyebrow}>
                <span className={styles.perspectiveLabel} style={{ color: 'var(--accent-neutral)' }}>
                  Verified Shared Consensus
                </span>
                <span className={styles.sourceTags}>
                  Synthesized by Local TinyLlama 1.1B
                </span>
              </div>

              <p className={styles.framingText}>{aiOverview.summary}</p>

              <div className={styles.factsGroup}>
                <div className={styles.factBlock}>
                  <div className={`${styles.blockTitle} ${styles.titleEmphasized}`}>
                    <CheckCircle size={13} color="var(--accent-neutral)" />
                    <span>Undeniable Facts Both Sides Agree On</span>
                  </div>
                  <div className={styles.pointsList}>
                    {aiOverview.consensusFacts.map((fact, idx) => (
                      <div key={idx} className={styles.pointItem}>
                        <span className={styles.bulletSymbol}>0{idx + 1}</span>
                        <p>{fact}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'right' && (
            <div className={styles.column}>
              <div className={styles.columnEyebrow}>
                <span className={`${styles.perspectiveLabel} ${styles.labelRight}`}>
                  Right-Leaning Perspective
                </span>
                <span className={styles.sourceTags}>
                  Sourced from: {rightPerspective.sources.join(', ')}
                </span>
              </div>

              <h2 className={styles.perspectiveHeadline}>{rightPerspective.headline}</h2>

              <div className={styles.framingSection}>
                <span className={styles.sectionSubhead}>Framing Narrative</span>
                <p className={styles.framingText}>{rightPerspective.framing}</p>
              </div>

              <div className={styles.factsGroup}>
                <div className={styles.factBlock}>
                  <div className={`${styles.blockTitle} ${styles.titleEmphasized}`}>
                    <CheckCircle size={13} color="var(--accent-right)" />
                    <span>Emphasized Focus Points</span>
                  </div>
                  <div className={styles.pointsList}>
                    {rightPerspective.highlightedFacts.map((fact, idx) => (
                      <div key={idx} className={styles.pointItem}>
                        <span className={styles.bulletSymbol}>+</span>
                        <p>{fact}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={styles.factBlock}>
                  <div className={`${styles.blockTitle} ${styles.titleOmitted}`}>
                    <AlertCircle size={13} color="#ef4444" />
                    <span>Omitted Facts (Blindspots)</span>
                  </div>
                  <div className={styles.pointsList}>
                    {rightPerspective.omittedFacts.map((fact, idx) => (
                      <div key={idx} className={styles.pointItem}>
                        <span className={`${styles.bulletSymbol} ${styles.omittedBullet}`}>—</span>
                        <p>{fact}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        // Desktop View: Simultaneous 50/50 Split Screen Unzipped
        <div className={styles.columnsContainer}>
          {/* Left Column: Left-Leaning Perspective */}
          <div ref={leftColRef} className={`${styles.column} ${styles.leftColumn}`}>
            <div className={styles.columnEyebrow}>
              <span className={`${styles.perspectiveLabel} ${styles.labelLeft}`}>
                Left-Leaning Perspective
              </span>
              <span className={styles.sourceTags}>
                Sourced from: {leftPerspective.sources.join(', ')}
              </span>
            </div>

            <h2 className={styles.perspectiveHeadline}>{leftPerspective.headline}</h2>

            <div className={styles.framingSection}>
              <span className={styles.sectionSubhead}>Framing Narrative</span>
              <p className={styles.framingText}>{leftPerspective.framing}</p>
            </div>

            <div className={styles.factsGroup}>
              <div className={styles.factBlock}>
                <div className={`${styles.blockTitle} ${styles.titleEmphasized}`}>
                  <Plus size={13} color="var(--accent-left)" />
                  <span>Emphasized Focus Points</span>
                </div>
                <div className={styles.pointsList}>
                  {leftPerspective.highlightedFacts.map((fact, idx) => (
                    <div key={idx} className={styles.pointItem}>
                      <span className={styles.bulletSymbol}>+</span>
                      <p>{fact}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.factBlock}>
                <div className={`${styles.blockTitle} ${styles.titleOmitted}`}>
                  <Minus size={13} color="#ef4444" />
                  <span>Omitted Facts (Blindspots)</span>
                </div>
                <div className={styles.pointsList}>
                  {leftPerspective.omittedFacts.map((fact, idx) => (
                    <div key={idx} className={styles.pointItem}>
                      <span className={`${styles.bulletSymbol} ${styles.omittedBullet}`}>—</span>
                      <p>{fact}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Right-Leaning Perspective */}
          <div ref={rightColRef} className={`${styles.column} ${styles.rightColumn}`}>
            <div className={styles.columnEyebrow}>
              <span className={`${styles.perspectiveLabel} ${styles.labelRight}`}>
                Right-Leaning Perspective
              </span>
              <span className={styles.sourceTags}>
                Sourced from: {rightPerspective.sources.join(', ')}
              </span>
            </div>

            <h2 className={styles.perspectiveHeadline}>{rightPerspective.headline}</h2>

            <div className={styles.framingSection}>
              <span className={styles.sectionSubhead}>Framing Narrative</span>
              <p className={styles.framingText}>{rightPerspective.framing}</p>
            </div>

            <div className={styles.factsGroup}>
              <div className={styles.factBlock}>
                <div className={`${styles.blockTitle} ${styles.titleEmphasized}`}>
                  <Plus size={13} color="var(--accent-right)" />
                  <span>Emphasized Focus Points</span>
                </div>
                <div className={styles.pointsList}>
                  {rightPerspective.highlightedFacts.map((fact, idx) => (
                    <div key={idx} className={styles.pointItem}>
                      <span className={styles.bulletSymbol}>+</span>
                      <p>{fact}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.factBlock}>
                <div className={`${styles.blockTitle} ${styles.titleOmitted}`}>
                  <Minus size={13} color="#ef4444" />
                  <span>Omitted Facts (Blindspots)</span>
                </div>
                <div className={styles.pointsList}>
                  {rightPerspective.omittedFacts.map((fact, idx) => (
                    <div key={idx} className={styles.pointItem}>
                      <span className={`${styles.bulletSymbol} ${styles.omittedBullet}`}>—</span>
                      <p>{fact}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
