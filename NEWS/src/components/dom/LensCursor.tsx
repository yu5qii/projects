'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useAppStore, CursorMode } from '@/lib/store';
import styles from './LensCursor.module.scss';

export const LensCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  const cursorMode = useAppStore((state) => state.cursorMode);
  const cursorLabel = useAppStore((state) => state.cursorLabel);
  const isAnalyzing = useAppStore((state) => state.isAnalyzing);
  const setCursorMode = useAppStore((state) => state.setCursorMode);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if device supports hover (avoid showing on pure touch devices)
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const dot = dotRef.current;
    const orb = orbRef.current;
    const label = labelRef.current;

    if (!dot || !orb) return;

    // Fast direct positioning for center dot
    const xToDot = gsap.quickTo(dot, 'x', { duration: 0.1, ease: 'power3' });
    const yToDot = gsap.quickTo(dot, 'y', { duration: 0.1, ease: 'power3' });

    // Smooth trailing physics with inertia for floating orb
    const xToOrb = gsap.quickTo(orb, 'x', { duration: 0.35, ease: 'power2.out' });
    const yToOrb = gsap.quickTo(orb, 'y', { duration: 0.35, ease: 'power2.out' });

    let xToLabel: ((value: number) => gsap.core.Tween) | null = null;
    let yToLabel: ((value: number) => gsap.core.Tween) | null = null;
    if (label) {
      xToLabel = gsap.quickTo(label, 'x', { duration: 0.42, ease: 'power2.out' });
      yToLabel = gsap.quickTo(label, 'y', { duration: 0.42, ease: 'power2.out' });
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);

      const { clientX: x, clientY: y } = e;
      xToDot(x);
      yToDot(y);
      xToOrb(x);
      yToOrb(y);

      if (xToLabel && yToLabel) {
        xToLabel(x);
        yToLabel(y);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Global listener for interactive/biased/consensus hover targets
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const biasedTarget = target.closest('[data-cursor-target="biased"]');
      const consensusTarget = target.closest('[data-cursor-target="consensus"]');
      const interactiveTarget = target.closest('button, a, input, [role="button"], [data-cursor-target="interactive"]');

      if (biasedTarget) {
        const lean = biasedTarget.getAttribute('data-bias-lean') || 'BIASED FRAMING';
        setCursorMode('biased', `DETECTED // ${lean}`);
      } else if (consensusTarget) {
        setCursorMode('consensus', 'LENS OF TRUTH // 100% VERIFIED FACT');
      } else if (interactiveTarget) {
        setCursorMode('interactive', '');
      } else {
        if (!isAnalyzing) {
          setCursorMode('default', '');
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isVisible, isAnalyzing, setCursorMode]);

  // Compute active class based on cursor mode
  const activeMode: CursorMode = isAnalyzing ? 'analyzing' : cursorMode;
  const modeClass =
    activeMode === 'biased'
      ? styles.modeBiased
      : activeMode === 'consensus'
      ? styles.modeConsensus
      : activeMode === 'analyzing'
      ? styles.modeAnalyzing
      : activeMode === 'interactive'
      ? styles.modeInteractive
      : '';

  const displayText =
    activeMode === 'analyzing'
      ? 'SYNTHESIZING TRUTH...'
      : cursorLabel;

  if (!isVisible) return null;

  return (
    <div className={`${styles.cursorContainer} ${modeClass}`}>
      <div ref={dotRef} className={styles.cursorDot} />
      <div ref={orbRef} className={styles.cursorOrb}>
        <div className={styles.cursorRing} />
      </div>
      {displayText && (
        <div ref={labelRef} className={styles.cursorLabel}>
          {displayText}
        </div>
      )}
    </div>
  );
};
