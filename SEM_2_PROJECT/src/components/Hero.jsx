import React from 'react';

export default function Hero() {
  return (
    <div className="hero">
      <div className="hero-bg-text">p1xel4ted_</div>
      <p className="hero-tag">Student Portfolio</p>
      <h1 className="hero-headline">
        Did not learn to<br/>
        <em>dream</em> small.
      </h1>
      <p className="hero-sub"></p>
      <div className="hero-actions">
        <a href="#work" className="btn-primary">See my work</a>
        <a href="#services" className="btn-ghost">What I do</a>
      </div>
    </div>
  );
}
