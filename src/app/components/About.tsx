import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
// import ScrollAnimatedComp from './ScrollAnimatedComp';

const firstAbsoluteCtnTop = 10;
const bubbleWrapperHeight = 80;
const bubbleHeight = 40;
const secondAbsCtnTop = firstAbsoluteCtnTop + bubbleWrapperHeight - bubbleHeight;

const About: React.FC = () => {
  const bubble1Ref = useRef<HTMLDivElement | null>(null);
  // const bubble2Ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        console.log(entries);

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.firstElementChild.classList.add('in-view');
          } else {
            entry.target.firstElementChild.classList.remove('in-view');
          }
        });
      },
      { rootMargin: '50% 0px 0px 0px', threshold: 0 }
    );

    if (bubble1Ref.current) {
      observer.observe(bubble1Ref.current);
    }

    return () => {
      if (bubble1Ref.current) {
        observer.unobserve(bubble1Ref.current);
      }
    };
  }, []);

  return (
    <div className="relative flex justify-center h-[200vh]">
      <div className="sticky top-[40%] 2xl:top-1/3 mt-[33vh] w-1/4 min-w-60 h-96 flex justify-center items-center">
        <Image
          src="/about/nain.png"
          alt="nain présentation"
          width={500}
          height={500}
          className="size-full object-contain"
        />
      </div>

      <div
        className={`absolute left-[52%] ${`top-[${firstAbsoluteCtnTop}vh]`} w-1/2 ${`h-[${bubbleWrapperHeight}vh]`} border-2 border-black`}
        ref={bubble1Ref}
      >
        <div className={`sticky top-[10vh] w-[30rem] ${`h-[${bubbleHeight}vh]`} flex justify-center items-center bg-[url('/about/bulle1.png')] bg-contain bg-center bg-no-repeat border-2 border-violet-400`}>
          <p
            className={`w-3/4 2xl:w-[75%] mb-10 licorice-font text-4xl font-semibold text-center text-pretty`}
          >
            Je m'appelle Amaia et je suis dessinatrice.
            <br />
            Je fais des illustrations jeunesse, fantasy ainsi que des BD
            humoristiques.
          </p>
        </div>
      </div>
      <div className={`absolute left-0 ${`top-[${secondAbsCtnTop}vh]`} w-1/2 ${`h-[${bubbleWrapperHeight}vh]`} border-2 border-red-400`}>
        <div
          ref={null}
          className={`sticky top-[10vh] ml-auto w-[30rem] ${`h-[${bubbleHeight}vh]`} flex justify-center items-center bg-[url('/about/bulle2.png')] bg-contain bg-center bg-no-repeat border-2 border-violet-400`}
        >
          <p className="w-[70%] h-[30%] mb-6 mr-4 licorice-font text-3xl font-semibold text-center">
            Je suis bascophone, et j'aime illustrer également ce qui a un
            rapport avec la mythologie et la culture basque.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
