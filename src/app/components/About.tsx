import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import ScrollAnimatedComp from './ScrollAnimatedComp';

const About: React.FC = () => {
  return (
    <div className="flex flex-col items-center m-32 about-section-mt">
      <div className="w-1/2 h-[200vh]">
        <div className="sticky dwarf-position flex justify-center">
          <div className="relative w-96 min-w-60 h-96 flex justify-center items-center">
            <Image
              src="/about/nain.png"
              alt="nain présentation"
              width={500}
              height={500}
              className="size-full object-contain"
            />
            <ScrollAnimatedComp
              className="absolute -right-[80%] bottom-1/2 w-[120%] h-[120%] flex justify-center items-center bg-[url('/about/bulle1.png')] bg-contain bg-center bg-no-repeat"
              openAt={6400}
              closeAt={7100}
              enterClassName="opacity-100"
              exitClassName="opacity-0"
              transitionDuration={500}
            >
              <p
                className={`w-[75%] h-[30%] mb-12 licorice-font text-3xl font-semibold text-center`}
              >
                Je m'appelle Amaia et je suis dessinatrice.
                <br />
                Je fais des illustrations jeunesse, fantasy ainsi que des BD
                humoristiques.
              </p>
            </ScrollAnimatedComp>
            <ScrollAnimatedComp
              className="absolute right-[60%] bottom-1/2 w-[120%] h-[120%] flex justify-center items-center bg-[url('/about/bulle2.png')] bg-contain bg-center bg-no-repeat"
              openAt={7100}
              closeAt={7600}
              enterClassName="opacity-100"
              exitClassName="opacity-0"
              transitionDuration={500}
            >
              <p className="w-[70%] h-[30%] mb-6 mr-4 licorice-font text-3xl font-semibold text-center">
                Je suis bascophone, et j'aime illustrer également ce qui a un
                rapport avec la mythologie et la culture basque.
              </p>
            </ScrollAnimatedComp>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
