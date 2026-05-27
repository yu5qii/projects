import React from 'react';

const STATS = [
  { num: "Ridah", label: "Name" },
  { num: "CSE 21", label: "Class" },
  { num: "0911", label: "Roll No." },
  { num: "II", label: "Semester" }
];

export default function About() {
  return (
    <div className="about" id="about">
      <div className="about-text">
        <div className="section-label">Who am I?</div>
        <h2 className="about-headline">
          Small world.<br/>
          <em>Big</em> DREAMS.<br/>
          No filler.
        </h2>
        <p className="about-body">
          I believe there is nothing in this world more powerful than the ability to 
          force your way through difficult times and emerging as an individual capable of taking a stand for their 
          philosophy.
        </p>
      </div>
      <div className="about-stats">
        {STATS.map((stat, idx) => (
          <div key={idx}>
            <div className="stat-num">{stat.num}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
