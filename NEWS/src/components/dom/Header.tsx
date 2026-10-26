'use client';

import React from 'react';
import { Eye, RotateCcw, Zap } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import styles from './Header.module.scss';

export const Header: React.FC = () => {
  const isAnalyzing = useAppStore((state) => state.isAnalyzing);
  const results = useAppStore((state) => state.results);
  const resetAnalysis = useAppStore((state) => state.resetAnalysis);

  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <div className={styles.logoIcon}>
          <Eye size={20} />
        </div>
        <div className={styles.titles}>
          <h1 className={styles.mainTitle}>The Naked Truth</h1>
          <span className={styles.tagline}>Anti-Echo Chamber News Reader // Ver. 1.0</span>
        </div>
      </div>

      <div className={styles.statusGroup}>
        <div className={styles.badge}>
          <span className={`${styles.pulseDot} ${isAnalyzing ? styles.pulseDotBusy : ''}`} />
          <span>{isAnalyzing ? 'DISTILLING' : 'LENS ACTIVE'}</span>
        </div>

        <div className={styles.badge}>
          <Zap size={11} color="var(--accent-cyan)" />
          <span>R3F 3D ENGINE</span>
        </div>

        {(results || isAnalyzing) && (
          <button
            onClick={resetAnalysis}
            className={styles.resetButton}
            data-cursor-target="interactive"
          >
            <RotateCcw size={12} style={{ display: 'inline', marginRight: '5px' }} />
            Reset
          </button>
        )}
      </div>
    </header>
  );
};
