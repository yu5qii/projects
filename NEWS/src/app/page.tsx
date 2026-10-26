'use client';

import React from 'react';
import { UrlInputForm } from '@/components/dom/UrlInputForm';
import { AnalysisStepTracker } from '@/components/dom/AnalysisStepTracker';
import { ConsensusDashboard } from '@/components/dom/ConsensusDashboard';

export default function Home() {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <UrlInputForm />
      <AnalysisStepTracker />
      <ConsensusDashboard />
    </div>
  );
}
