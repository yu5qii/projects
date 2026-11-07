'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { X, ArrowRight } from 'lucide-react';
import { useMinimalStore } from '@/lib/store';
import styles from './UrlAnalyzerModal.module.scss';

export const UrlAnalyzerModal: React.FC = () => {
  const router = useRouter();
  const isUrlModalOpen = useMinimalStore((state) => state.isUrlModalOpen);
  const setUrlModalOpen = useMinimalStore((state) => state.setUrlModalOpen);
  const isAnalyzing = useMinimalStore((state) => state.isAnalyzing);
  const statusMessage = useMinimalStore((state) => state.statusMessage);
  const error = useMinimalStore((state) => state.error);
  const analyzeCustomUrl = useMinimalStore((state) => state.analyzeCustomUrl);

  const [inputUrl, setInputUrl] = useState('');

  if (!isUrlModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputUrl.trim() || isAnalyzing) return;

    const parsedArticle = await analyzeCustomUrl(inputUrl);
    if (parsedArticle) {
      router.push(`/article/${parsedArticle.id}`);
    }
  };

  return (
    <div className={styles.backdrop} onClick={() => !isAnalyzing && setUrlModalOpen(false)}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <div className={styles.titleArea}>
            <span className={styles.eyebrow}>Local TinyLlama 1.1B Inference Engine</span>
            <h2 className={styles.title}>Inspect Any News URL</h2>
          </div>
          {!isAnalyzing && (
            <button
              onClick={() => setUrlModalOpen(false)}
              className={styles.closeButton}
            >
              <X size={18} />
            </button>
          )}
        </div>

        {isAnalyzing ? (
          <div className={styles.loadingState}>
            <div className={styles.loadingHeader}>
              <div className={styles.spinner} />
              <span>{statusMessage}</span>
            </div>
            <div className={styles.skeletonLines}>
              <div className={styles.skeletonLine} />
              <div className={`${styles.skeletonLine} ${styles.skeletonLineMed}`} />
              <div className={`${styles.skeletonLine} ${styles.skeletonLineShort}`} />
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <input
                type="url"
                required
                placeholder="https://www.theguardian.com/... or https://www.wsj.com/..."
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                className={styles.input}
                autoFocus
              />
            </div>

            {error && <div className={styles.errorNotice}>{error}</div>}

            <button
              type="submit"
              disabled={isAnalyzing || !inputUrl.trim()}
              className={styles.submitBtn}
            >
              <span>Dissect Perspectives</span>
              <ArrowRight size={14} />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
