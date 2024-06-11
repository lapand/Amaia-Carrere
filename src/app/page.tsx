"use client";

import { Element } from "react-scroll";
import Section from "./components/Section";
import Home from "./components/Home";

const Main: React.FC = () => {

  return (
    <main className="flex min-h-screen flex-col overflow-hidden">
      <Element name="Home" id="Home">
        <Section className="h-screen bg-home">
          <Home />
        </Section>
      </Element>
      <Element name="" id="">
        <Section>
       {/* <ProjectSection /> */}
        </Section>
      </Element>
      <Element name="" id="">
        <Section>
       {/* <Skills /> */}
        </Section>
      </Element>
      <Element name="About" id="About">
        <Section>
       {/* <About /> */}
        </Section>
      </Element>
      <Element name="Contact" id="Contact">
        <Section>
       {/* <Contact /> */}
        </Section>
      </Element>
    </main>
  );
}

export default Main;