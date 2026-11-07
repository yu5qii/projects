'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useMinimalStore } from '@/lib/store';
import styles from './Header.module.scss';

export const Header: React.FC = () => {
  const setUrlModalOpen = useMinimalStore((state) => state.setUrlModalOpen);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.brandGroup}>
          <Link href="/" className={styles.logo}>
            <span className={styles.logoDot} />
            <span>The Naked Truth</span>
          </Link>
          {/* <span className={styles.editionTag}>
            Global Briefing // Autumn 2026
          </span> */}
        </div>

        <div className={styles.actionsGroup}>
          <div className={styles.modelBadge}>
            <span className={styles.statusIndicator} />
            {/* <span>Local AI: TinyLlama 1.1B (4-Bit)</span> */}
          </div>

          <button
            onClick={() => setUrlModalOpen(true)}
            className={styles.analyzeButton}
            title="Inspect any external news article URL"
          >
            <span>Analyze URL</span>
            <ArrowUpRight size={13} />
          </button>
        </div>
      </div>
    </header>
  );
};
