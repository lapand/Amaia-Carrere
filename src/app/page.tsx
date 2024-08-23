'use client';

import Section from './components/Section';
import Home from './components/Home';
import Gallery from './components/Gallery';
import ForSale from './components/ForSale';
import About from './components/About';
import Contact from './components/Contact';

const Main: React.FC = () => {
  return (
    <main className="flex min-h-screen flex-col main-bg">
      <div
        className="home"
        id="Home"
      >
        <Section className='h-screen pb-safe-bottom border-none'>
          <Home />
        </Section>
      </div>
      <Section className="min-h-screen" id="Gallery">
        <Gallery />
      </Section>
      <Section className="min-h-screen" id="ForSale">
        <ForSale />
      </Section>
      <Section className="min-h-screen" id="About">
        <About />
      </Section>
      <Section
        className="min-h-screen flex flex-col"
        style={{ paddingBottom: 0 }}
        id="Contact"
      >
        <Contact />
      </Section>
    </main>
  );
};

export default Main;
