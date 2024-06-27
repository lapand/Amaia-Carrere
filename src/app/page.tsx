"use client";

import { Element } from "react-scroll";
import Section from "./components/Section";
import Home from "./components/Home";
import Gallery from "./components/Gallery";
import ForSale from "./components/ForSale";
import About from "./components/About";
import Contact from "./components/Contact";

const Main: React.FC = () => {

  return (
    <main className="flex min-h-screen flex-col main-bg">
      <Element name="Home" id="Home">
        <Section className="h-screen">
          <Home />
        </Section>
      </Element>
      <Element name="Gallery" id="Gallery">
        <Section className="min-h-screen">
          <Gallery />
        </Section>
      </Element>
      <Element name="ForSale" id="ForSale">
        <Section className="min-h-screen">
          <ForSale />
        </Section>
      </Element>
      <Element name="About" id="About">
        <Section className="min-h-screen">
          <About />
        </Section>
      </Element>
      <Element name="Contact" id="Contact">
        <Section className="max-lg:min-h-screen lg:h-screen" style={{ paddingBottom: 0 }}>
          <Contact />
        </Section>
      </Element>
    </main>
  );
}

export default Main;