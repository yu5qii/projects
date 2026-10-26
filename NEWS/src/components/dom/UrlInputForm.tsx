'use client';

import React, { useState } from 'react';
import { ArrowRight, Globe, Sparkles } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import styles from './UrlInputForm.module.scss';

const PRESET_ARTICLES = [
  {
    name: 'Clean Energy Spending Bill',
    url: 'https://www.theguardian.com/us-news/clean-energy-package-investment-bill',
  },
  {
    name: 'Frontier AI Regulatory Act',
    url: 'https://www.washingtonpost.com/technology/frontier-ai-safety-standards',
  },
  {
    name: 'Federal Debt Ceiling Accord',
    url: 'https://www.reuters.com/world/us/bipartisan-debt-deal-breakdown',
  },
];

export const UrlInputForm: React.FC = () => {
  const url = useAppStore((state) => state.url);
  const setUrl = useAppStore((state) => state.setUrl);
  const isAnalyzing = useAppStore((state) => state.isAnalyzing);
  const results = useAppStore((state) => state.results);
  const runMockAnalysis = useAppStore((state) => state.runMockAnalysis);

  const [inputVal, setInputVal] = useState(url);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim() || isAnalyzing) return;
    setUrl(inputVal);
    runMockAnalysis(inputVal);
  };

  const handlePresetClick = (presetUrl: string) => {
    setInputVal(presetUrl);
    setUrl(presetUrl);
    runMockAnalysis(presetUrl);
  };

  // If results exist or analysis is ongoing, don't show the initial hero header
  if (results) return null;

  return (
    <div className={styles.formContainer}>
      <div className={styles.heroTag}>
        <Sparkles size={13} />
        <span>Anti-Echo Chamber Lens</span>
      </div>

      <h2 className={styles.title}>
        See What Both Sides <br />
        <span>Agreed On & Hid.</span>
      </h2>

      <p className={styles.subtitle}>
        Paste any biased news article URL. Our 3D cognitive engine scrapes the story,
        retrieves the opposite viewpoint, and isolates undeniable shared facts while revealing
        what each side omitted.
      </p>

      <form onSubmit={handleSubmit} className={styles.inputCard}>
        <div className={styles.inputIcon}>
          <Globe size={18} />
        </div>
        <input
          type="url"
          required
          placeholder="Paste article URL (e.g., https://theguardian.com/... or wsj.com/...)"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          disabled={isAnalyzing}
          className={styles.urlInput}
          data-cursor-target="interactive"
        />
        <button
          type="submit"
          disabled={isAnalyzing || !inputVal.trim()}
          className={styles.submitButton}
          data-cursor-target="interactive"
        >
          <span>{isAnalyzing ? 'Analyzing...' : 'Distill Truth'}</span>
          <ArrowRight size={15} />
        </button>
      </form>

      {!isAnalyzing && (
        <div className={styles.presetsSection}>
          <span className={styles.presetsLabel}>Or inspect a polarizing story:</span>
          <div className={styles.presetChips}>
            {PRESET_ARTICLES.map((preset) => (
              <button
                key={preset.name}
                type="button"
                onClick={() => handlePresetClick(preset.url)}
                className={styles.presetChip}
                data-cursor-target="interactive"
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
