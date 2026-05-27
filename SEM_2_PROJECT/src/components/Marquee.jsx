import React from 'react';

const ITEMS = [
  "Ridah Abbasi", "✴", "CSE 21", "✴", "2503201000911", "✴", 
  "Web Designing", "✴"
];

export default function Marquee() {
  
  const displayItems = [...ITEMS, ...ITEMS];

  return (
    <div className="marquee-wrap">
      <div className="marquee-track">
        {displayItems.map((item, idx) => (
          <span 
            key={idx} 
            className={item === "✦" ? "accent" : ""}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
