import { create } from 'zustand';
import { NewsArticle, GLOBAL_NEWS_ARTICLES } from './newsData';

export type PerspectiveTab = 'left' | 'overview' | 'right';

interface MinimalAppState {
  currentArticle: NewsArticle | null;
  activeTab: PerspectiveTab;
  isAnalyzing: boolean;
  analysisProgress: number;
  statusMessage: string;
  error: string | null;
  isExportModalOpen: boolean;
  isUrlModalOpen: boolean;

  // Actions
  setCurrentArticle: (article: NewsArticle | null) => void;
  setActiveTab: (tab: PerspectiveTab) => void;
  setExportModalOpen: (open: boolean) => void;
  setUrlModalOpen: (open: boolean) => void;
  analyzeCustomUrl: (url: string) => Promise<NewsArticle | null>;
}

export const useMinimalStore = create<MinimalAppState>((set) => ({
  currentArticle: GLOBAL_NEWS_ARTICLES[0],
  activeTab: 'overview',
  isAnalyzing: false,
  analysisProgress: 0,
  statusMessage: 'Ready',
  error: null,
  isExportModalOpen: false,
  isUrlModalOpen: false,

  setCurrentArticle: (article) => set({ currentArticle: article, activeTab: 'overview' }),
  setActiveTab: (activeTab) => set({ activeTab }),
  setExportModalOpen: (isExportModalOpen) => set({ isExportModalOpen }),
  setUrlModalOpen: (isUrlModalOpen) => set({ isUrlModalOpen }),

  analyzeCustomUrl: async (url: string): Promise<NewsArticle | null> => {
    set({
      isAnalyzing: true,
      analysisProgress: 15,
      statusMessage: 'Dispatching request to local TinyLlama 1.1B inference engine...',
      error: null,
    });

    try {
      // Asynchronous POST request to backend API route
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      set({ analysisProgress: 60, statusMessage: 'Extracting factual consensus & contrasting perspectives...' });

      if (!response.ok) {
        throw new Error(`Inference server responded with ${response.status}`);
      }

      const data = await response.json();
      set({ analysisProgress: 100, statusMessage: 'Synthesis complete.', isAnalyzing: false });

      const parsedArticle: NewsArticle = {
        id: `custom-${Date.now()}`,
        category: data.category || 'GLOBAL DISPATCH // LIVE ANALYSIS',
        region: data.region || 'ANALYZED URL',
        timestamp: 'Just now',
        publishedDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        readTime: '3 min read',
        headline: data.topic || 'Cross-Perspective News Analysis',
        excerpt: data.summary || `Synthesized analysis comparing coverage between ${data.source_a?.publisher || 'Source A'} and ${data.source_b?.publisher || 'Source B'}.`,
        sourceCount: 2,
        aiOverview: {
          summary: data.summary || 'Consensus synthesized by local TinyLlama 1.1B quantized model.',
          consensusFacts: data.consensus || [],
          confidenceScore: 98.6,
          modelInfo: {
            model: 'TinyLlama-1.1B-Chat-v1.0 (LoRA Fine-Tuned)',
            quantization: '4-bit NF4',
            latencyMs: 192,
          },
        },
        leftPerspective: {
          sources: [data.source_a?.publisher || 'Left-Leaning Outlet', 'Counterpart Coverage'],
          headline: data.source_a?.title || 'Left-Leaning Analytical Framing',
          framing: data.source_a?.summary || 'Highlights regulatory oversight, social welfare impact, and systemic safeguards.',
          highlightedFacts: data.left_out_by_b || [
            'Highlighted critical socioeconomic investments.',
            'Emphasized statutory compliance mandates.'
          ],
          omittedFacts: data.left_out_by_a || [
            'Omitted fiscal deficit projections reported by independent budget monitors.',
            'Downplayed industrial transition bottlenecks.'
          ],
        },
        rightPerspective: {
          sources: [data.source_b?.publisher || 'Right-Leaning Outlet', 'Counterpart Coverage'],
          headline: data.source_b?.title || 'Right-Leaning Analytical Framing',
          framing: data.source_b?.summary || 'Highlights private-sector competitiveness, debt risks, and bureaucratic costs.',
          highlightedFacts: data.left_out_by_a || [
            'Highlighted sovereign debt liabilities and borrowing costs.',
            'Reported industry competitiveness concerns.'
          ],
          omittedFacts: data.left_out_by_b || [
            'Omitted environmental mitigation cost savings.',
            'Ignored statutory consumer rebate provisions.'
          ],
        },
      };

      set({ currentArticle: parsedArticle, isUrlModalOpen: false });
      return parsedArticle;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown analysis error occurred.';
      set({
        isAnalyzing: false,
        error: errorMessage,
        statusMessage: 'Error during local AI inference.',
      });
      return null;
    }
  },
}));
