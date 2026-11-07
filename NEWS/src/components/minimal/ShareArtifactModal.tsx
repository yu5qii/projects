'use client';

import React, { useEffect, useRef, useState } from 'react';
import { X, Download, Check } from 'lucide-react';
import { NewsArticle } from '@/lib/newsData';
import { useMinimalStore } from '@/lib/store';
import styles from './ShareArtifactModal.module.scss';

interface ShareArtifactModalProps {
  article: NewsArticle;
}

export const ShareArtifactModal: React.FC<ShareArtifactModalProps> = ({ article }) => {
  const isExportModalOpen = useMinimalStore((state) => state.isExportModalOpen);
  const setExportModalOpen = useMinimalStore((state) => state.setExportModalOpen);
  const [downloaded, setDownloaded] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');

  useEffect(() => {
    if (!isExportModalOpen) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Retina 2x scale: 1200 x 1400 px
    const width = 1200;
    const height = 1400;
    canvas.width = width;
    canvas.height = height;

    // 1. Background: Deep Charcoal
    ctx.fillStyle = '#080808';
    ctx.fillRect(0, 0, width, height);

    // 2. Outer hairline frame
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.lineWidth = 2;
    ctx.strokeRect(40, 40, width - 80, height - 80);

    // 3. Top Eyebrow Metadata
    ctx.fillStyle = '#71717a';
    ctx.font = '600 16px -apple-system, BlinkMacSystemFont, "SF Mono", monospace';
    ctx.fillText('THE NAKED TRUTH // EDITORIAL VERIFICATION ARTIFACT', 80, 95);

    ctx.textAlign = 'right';
    ctx.fillText(`${article.publishedDate.toUpperCase()} • ${article.category}`, width - 80, 95);
    ctx.textAlign = 'left';

    // Divider Line
    ctx.beginPath();
    ctx.moveTo(80, 120);
    ctx.lineTo(width - 80, 120);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.stroke();

    // 4. Main Headline (Wrapped)
    ctx.fillStyle = '#ffffff';
    ctx.font = '500 42px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
    
    const wrapText = (text: string, x: number, y: number, maxWidth: number, lineHeight: number) => {
      const words = text.split(' ');
      let line = '';
      let currentY = y;

      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        const testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
          ctx.fillText(line, x, currentY);
          line = words[n] + ' ';
          currentY += lineHeight;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, x, currentY);
      return currentY + lineHeight;
    };

    let nextY = wrapText(article.headline, 80, 185, width - 160, 52);

    // 5. AI Overview Box
    nextY += 20;
    ctx.fillStyle = '#0f0f11';
    ctx.fillRect(80, nextY, width - 160, 390);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.strokeRect(80, nextY, width - 160, 390);

    // Box Header
    ctx.fillStyle = '#10b981';
    ctx.font = '700 15px -apple-system, BlinkMacSystemFont, "SF Mono", monospace';
    ctx.fillText('● AI OVERVIEW // UNDENIABLE VERIFIED CONSENSUS', 115, nextY + 45);

    ctx.fillStyle = '#71717a';
    ctx.textAlign = 'right';
    ctx.font = '14px -apple-system, BlinkMacSystemFont, "SF Mono", monospace';
    ctx.fillText(`${article.aiOverview.modelInfo.model} (${article.aiOverview.modelInfo.quantization})`, width - 115, nextY + 45);
    ctx.textAlign = 'left';

    // Consensus Facts list (up to 4 facts for card brevity)
    let factY = nextY + 95;
    ctx.font = '400 20px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
    article.aiOverview.consensusFacts.slice(0, 4).forEach((fact, idx) => {
      ctx.fillStyle = '#10b981';
      ctx.fillText(`0${idx + 1}`, 115, factY);

      ctx.fillStyle = '#e4e4e7';
      wrapText(fact, 160, factY, width - 300, 30);
      factY += 68;
    });

    // 6. Contenders' Perspectives Section
    nextY = nextY + 440;

    // Left Column Box
    const colWidth = (width - 160 - 30) / 2;
    ctx.fillStyle = '#0f0f11';
    ctx.fillRect(80, nextY, colWidth, 420);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.strokeRect(80, nextY, colWidth, 420);

    // Left Tag
    ctx.fillStyle = '#7dd3fc';
    ctx.font = '700 14px -apple-system, BlinkMacSystemFont, "SF Mono", monospace';
    ctx.fillText('LEFT-LEANING PERSPECTIVE', 105, nextY + 40);

    ctx.fillStyle = '#71717a';
    ctx.font = 'italic 14px Georgia, serif';
    ctx.fillText(`Sourced: ${article.leftPerspective.sources.slice(0, 3).join(', ')}`, 105, nextY + 68);

    ctx.fillStyle = '#f4f4f5';
    ctx.font = '400 22px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
    wrapText(article.leftPerspective.headline, 105, nextY + 115, colWidth - 50, 32);

    // Right Column Box
    const rightColX = 80 + colWidth + 30;
    ctx.fillStyle = '#0f0f11';
    ctx.fillRect(rightColX, nextY, colWidth, 420);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.strokeRect(rightColX, nextY, colWidth, 420);

    // Right Tag
    ctx.fillStyle = '#fca5a5';
    ctx.font = '700 14px -apple-system, BlinkMacSystemFont, "SF Mono", monospace';
    ctx.fillText('RIGHT-LEANING PERSPECTIVE', rightColX + 25, nextY + 40);

    ctx.fillStyle = '#71717a';
    ctx.font = 'italic 14px Georgia, serif';
    ctx.fillText(`Sourced: ${article.rightPerspective.sources.slice(0, 3).join(', ')}`, rightColX + 25, nextY + 68);

    ctx.fillStyle = '#f4f4f5';
    ctx.font = '400 22px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
    wrapText(article.rightPerspective.headline, rightColX + 25, nextY + 115, colWidth - 50, 32);

    // 7. Footer Stamp
    ctx.fillStyle = '#52525b';
    ctx.font = '13px -apple-system, BlinkMacSystemFont, "SF Mono", monospace';
    ctx.fillText('GENERATED ON-DEVICE VIA THE NAKED TRUTH NEWS READER • THE-NAKED-TRUTH.INTERNAL', 80, height - 70);

    setPreviewUrl(canvas.toDataURL('image/png'));
  }, [isExportModalOpen, article]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `naked-truth-${article.id}.png`;
    link.href = dataUrl;
    link.click();

    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  if (!isExportModalOpen) return null;

  return (
    <div className={styles.backdrop} onClick={() => setExportModalOpen(false)}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <span className={styles.modalTitle}>Shareable Typographic Artifact</span>
          <button
            onClick={() => setExportModalOpen(false)}
            className={styles.closeButton}
          >
            <X size={18} />
          </button>
        </div>

        <div className={styles.previewWrapper}>
          <canvas ref={canvasRef} style={{ display: 'none' }} />
          {previewUrl && (
            <img
              src={previewUrl}
              alt="Typographic Share Preview"
              className={styles.canvasPreview}
            />
          )}
        </div>

        <div className={styles.modalFooter}>
          <div className={styles.metaNotice}>
            High-resolution 1200×1400px Retina PNG formatted for social sharing.
          </div>

          <button onClick={handleDownload} className={styles.downloadButton}>
            {downloaded ? (
              <>
                <Check size={14} />
                <span>Saved Image</span>
              </>
            ) : (
              <>
                <Download size={14} />
                <span>Download PNG</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
