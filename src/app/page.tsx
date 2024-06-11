"use client";

import { Element } from "react-scroll";
import Section from "./components/Section";
import Home from "./components/Home";
import Gallery from "./components/Gallery";

const Main: React.FC = () => {

  return (
    <main className="flex min-h-screen flex-col overflow-hidden main-bg">
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
       {/* <Skills /> */}
        </Section>
      </Element>
      <Element name="About" id="About">
        <Section className="min-h-screen">
       {/* <About /> */}
        </Section>
      </Element>
      <Element name="Contact" id="Contact">
        <Section className="h-screen">
       {/* <Contact /> */}
        </Section>
      </Element>
    </main>
  );
}

export default Main;