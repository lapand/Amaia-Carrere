import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { useTranslation, Trans } from 'react-i18next';

const aboutCtnHeight = 200;
const dwarfCtnTop = 40;
const dwarfCtnHeight = aboutCtnHeight * 0.9 - dwarfCtnTop;
const bubbleWrapperHeight = 90;
const bubbleHeight = 40;
const bubble1CtnTop = 10;
// Place la 2nde bulle à la hauteur de la 1ere lorsque cette dernière a fini de défiler
const bubble2CtnTop = bubble1CtnTop + bubbleWrapperHeight - bubbleHeight;
const bubble2Top = 10;

const About: React.FC = () => {
  const bubble1Ref = useRef<HTMLDivElement | null>(null);
  const bubble2Ref = useRef<HTMLDivElement | null>(null);
  const dwarfRef = useRef<HTMLDivElement | null>(null);

  useTranslation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.intersectionRatio >= 1) {
            entry.target.classList.add('in-view');
          } else {
            entry.target.classList.remove('in-view');
          }
          if (dwarfRef.current) {
            if (bubble1Ref.current?.classList.contains('in-view')) {
              dwarfRef.current.classList.remove('dwarf-right');
              dwarfRef.current.classList.add('dwarf-left');
            }
            if (bubble2Ref.current?.classList.contains('in-view')) {
              dwarfRef.current.classList.remove('dwarf-left');
              dwarfRef.current.classList.add('dwarf-right');
            }
            if (
              !bubble1Ref.current?.classList.contains('in-view') &&
              !bubble2Ref.current?.classList.contains('in-view')
            ) {
              dwarfRef.current.classList.remove('dwarf-left');
              dwarfRef.current.classList.remove('dwarf-right');
            }
          }
        });
      },
      { rootMargin: '-10% 0px -40% 0px', threshold: [0, 1] }
    );

    if (bubble1Ref.current) {
      observer.observe(bubble1Ref.current);
    }
    if (bubble2Ref.current) {
      observer.observe(bubble2Ref.current);
    }

    return () => {
      if (bubble1Ref.current) {
        observer.unobserve(bubble1Ref.current);
      }
      if (bubble2Ref.current) {
        observer.unobserve(bubble2Ref.current);
      }
    };
  }, []);

  return (
    <div
      className="relative flex justify-center"
      style={{
        height: `${aboutCtnHeight}vh`,
        clipPath: 'inset(0 0 0 0)',
      }}
    >
      <div
        ref={dwarfRef}
        className="absolute w-1/4 min-w-60 flex justify-center transition-transform duration-300"
        style={{
          top: `${dwarfCtnTop}vh`,
          height: `${dwarfCtnHeight}vh`,
        }}
      >
        <div
          className="sticky h-96 flex justify-center items-center"
          style={{
            top: `${dwarfCtnTop}vh`,
          }}
        >
          <Image
            src="/about/nain.png"
            alt="nain présentation"
            width={500}
            height={500}
            className="size-full object-contain"
          />
        </div>
      </div>
      <div
        className="absolute sm:left-[35%] lg:left-[52%] w-[95%] sm:w-1/2"
        style={{
          top: `${bubble1CtnTop}vh`,
          height: `${bubbleWrapperHeight}vh`,
        }}
      >
        <div
          ref={bubble1Ref}
          className="sticky out-view sm:w-96 xl:w-[30rem] flex justify-center items-center bg-[url('/about/bulle1.png')] bg-contain bg-center bg-no-repeat"
          style={{ top: `${bubble1CtnTop}vh`, height: `${bubbleHeight}vh` }}
        >
          <p className="w-[88%] 2xl:w-[85%] mb-8 sm:mb-10 licorice-font text-3xl xl:text-4xl font-semibold text-center text-pretty">
            <Trans
              i18nKey="common:about.bubble1"
              components={{ break: <br /> }}
            />
          </p>
        </div>
      </div>
      <div
        className="absolute sm:left-[10%] lg:left-0 w-[95%] sm:w-1/2"
        style={{
          top: `${bubble2CtnTop}vh`,
          height: `${bubbleWrapperHeight}vh`,
        }}
      >
        <div
          ref={bubble2Ref}
          className="sticky out-view ml-auto sm:w-96 xl:w-[30rem] flex justify-center items-center bg-[url('/about/bulle2.png')] bg-contain bg-center bg-no-repeat"
          style={{ top: `${bubble2Top}vh`, height: `${bubbleHeight}vh` }}
        >
          <p className="w-[70%] h-[30%] mb-16 licorice-font text-3xl xl:text-4xl font-semibold text-center">
            <Trans i18nKey="common:about.bubble2" />
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
