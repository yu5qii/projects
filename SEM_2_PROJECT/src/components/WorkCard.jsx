import React from 'react';
import AsciiReveal from './AsciiReveal';

export default function WorkCard({ src, name, tags, index, aspectRatio = "16/9" }) {
  return (
    <div className="work-card">
      <AsciiReveal
        src={src}
        alt={name}
        aspectRatio={aspectRatio}
        cellWidth={6}
        cellHeight={9}
      />
      <div className="card-meta">
        <div>
          <div className="card-name">{name}</div>
          <div className="card-tags">
            {tags.map((tag, i) => (
              <span key={i} className="tag">{tag}</span>
            ))}
          </div>
        </div>
        <div className="card-index">{index}</div>
      </div>
    </div>
  );
}
