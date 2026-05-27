import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import WorkCard from './components/WorkCard';
import Services from './components/Services';
import About from './components/About';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <Navbar />
      
      <Hero />
      
      <Marquee />
      
      {/* WORK SECTION */}
      <section className="work" id="work">
        <div className="section-label">Reference pictures</div>
        <div className="work-header">
          <a href="https://github.com/yu5qii" className="work-all-link">All work →</a>
        </div>

        <div className="work-grid">
          <WorkCard 
            src="/images/project1.jpg" 
            name="Aura Botanicals" 
            tags={["Brand", "E-Commerce"]} 
            index="A001" 
            aspectRatio="3/4" 
          />
          <WorkCard 
            src="/images/project2.jpg" 
            name="Vela Audio" 
            tags={["Product"]} 
            index="A002" 
            aspectRatio="16/9" 
          />
          <WorkCard 
            src="/images/project3.jpg" 
            name="Dusk Spirits" 
            tags={["Identity"]} 
            index="A003" 
            aspectRatio="16/9" 
          />
          <WorkCard 
            src="/images/project4.jpg" 
            name="Grove Living" 
            tags={["Web"]} 
            index="A004" 
            aspectRatio="16/9" 
          />
          <WorkCard 
            src="/images/project5.jpg" 
            name="Lune Jewelry" 
            tags={["Brand"]} 
            index="A005" 
            aspectRatio="16/9" 
          />
          <WorkCard 
            src="/images/project6.jpg" 
            name="Atlas Fund" 
            tags={["Strategy", "Web"]} 
            index="A006" 
            aspectRatio="16/9" 
          />
        </div>
      </section>

      <Services />
      
      <About />
      
      <Footer />
    </>
  );
}
