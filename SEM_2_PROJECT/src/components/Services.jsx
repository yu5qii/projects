import React from 'react';

const SERVICES = [
  {
    num: "01",
    name: "Brand Identity",
    desc: "Visual systems that feel inevitable. Logo, type, color, and motion — built to scale across every surface."
  },
  {
    num: "02",
    name: "Web Design",
    desc: "Websites that convert without feeling like they're trying to. Editorial-grade layout with performance built in."
  },
  {
    num: "03",
    name: "E-Commerce",
    desc: "Premium storefronts where brands grow and consumers fall in love — from first click to checkout."
  },
  {
    num: "04",
    name: "Product Design",
    desc: "UX strategy and interface design for digital products. Research-backed, aesthetically considered, shipped fast."
  },
  {
    num: "05",
    name: "Motion and Film",
    desc: "Animation, motion graphics, and video production that give your brand a voice beyond static media."
  },
  {
    num: "06",
    name: "Development",
    desc: "Frontend and full-stack engineering. Clean code, accessible markup, and obsessive attention to performance."
  }
];

export default function Services() {
  return (
    <section className="services" id="services">
      <div className="section-label">What I do</div>
      <div className="services-grid">
        {SERVICES.map((service, idx) => (
          <div key={idx} className="service-item">
            <div className="service-num">{service.num}</div>
            <div className="service-name">{service.name}</div>
            <p className="service-desc">{service.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
