import React from 'react';

export default function Navbar() {
  return (
    <nav>
      <a href="#" className="nav-logo">p1xel4ted_</a>
      <ul className="nav-links">
        <li><a href="#work">Work</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#about">About</a></li>
      </ul>
      <a href="mailto:ridah.ppg@gmail.com" className="nav-cta">Get in touch</a>
    </nav>
  );
}
