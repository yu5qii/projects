import React from 'react';

export default function Footer() {
  return (
    <>
      <footer>
        <div>
          <div className="footer-brand">p1xel4ted_</div>
          <p className="footer-tagline">
            Student Portfolio
          </p>
        </div>
        <div className="footer-contact">
          <a href="mailto:ridah.ppg@gmail.com">ridah.ppg@gmail.com</a>
          <br/>
          <p style={{ marginTop: '1.5rem' }}>Follow along</p>
          <a href="https://www.instagram.com/yu5qii/">Instagram ↗</a>
          <a href="https://www.linkedin.com/in/ridah-abbasi/">LinkedIn ↗</a>
        </div>
      </footer>

      <div className="footer-bottom">
        <span>&copy; 2026 Ridah Abbasi</span>
        <span>New Delhi, India</span>
      </div>
    </>
  );
}
