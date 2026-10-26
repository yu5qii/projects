'use client';

import React from 'react';
import { useAppStore } from '@/lib/store';
import styles from './AnalysisStepTracker.module.scss';

const STEPS = [
  'Scraping and parsing article content...',
  'Extracting political bias & media framing...',
  'Locating counterpart coverage from opposite bias...',
  'Cross-referencing claims and isolating verified facts...',
  'Assembling consensus lens...',
];

export const AnalysisStepTracker: React.FC = () => {
  const isAnalyzing = useAppStore((state) => state.isAnalyzing);
  const analysisStep = useAppStore((state) => state.analysisStep);
  const analysisProgress = useAppStore((state) => state.analysisProgress);

  if (!isAnalyzing) return null;

  const currentStepIdx = STEPS.indexOf(analysisStep);

  return (
    <div className={styles.trackerContainer}>
      <div className={styles.headerRow}>
        <div className={styles.statusIndicator}>
          <div className={styles.spinnerRing} />
          <span className={styles.statusText}>{analysisStep}</span>
        </div>
        <span className={styles.percentage}>{analysisProgress}%</span>
      </div>

      <div className={styles.progressBarContainer}>
        <div
          className={styles.progressBarFill}
          style={{ width: `${analysisProgress}%` }}
        />
      </div>

      <div className={styles.stepsList}>
        {STEPS.map((step, idx) => {
          const isDone = currentStepIdx > idx;
          const isActive = currentStepIdx === idx;
          const statusClass = isDone ? styles.stepDone : isActive ? styles.stepActive : '';

          return (
            <div key={step} className={`${styles.stepItem} ${statusClass}`}>
              <div className={styles.stepDot} />
              <span>{step}</span>
            </div>
          );
        })}
      </div>

      <div className={styles.hintText}>
        Watch the 3D shards forcefully converge into the geometric truth crystal behind this overlay.
      </div>
    </div>
  );
};
