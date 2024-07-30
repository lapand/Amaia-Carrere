import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import removeContextMenu from '../modules/utils/removeContextMenu';

const dwarfCtnTop = 40;
const dwarfCtnHeight = 2000;
const bubbleWrapperHeight = 1000;
const bubbleHeight = 400;
const bubbleTop = 10;
const bubble2CtnTop = bubbleWrapperHeight;
const mainCtnHeight = bubbleWrapperHeight * 2 + bubbleHeight;

const About: React.FC = () => {
  const bubble1Ref = useRef<HTMLDivElement | null>(null);
  const bubble2Ref = useRef<HTMLDivElement | null>(null);
  const dwarfRef = useRef<HTMLDivElement | null>(null);

  useTranslation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
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
      { root: null, rootMargin: '-10% 100% -40% 100%', threshold: 1.0 }
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
        height: `${mainCtnHeight}px`,
      }}
    >
      <div
        ref={dwarfRef}
        className="absolute w-1/4 min-w-60 flex justify-center transition-transform duration-300"
        style={{
          top: `${dwarfCtnTop}vh`,
          height: `${dwarfCtnHeight}px`,
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
            onContextMenu={removeContextMenu}
          />
        </div>
      </div>
      <div
        className="absolute right-64 sm:right-40 lg:right-20 xl:right-0 w-1/2"
        style={{
          top: `${bubbleTop}vh`,
          height: `${bubbleWrapperHeight}px`,
        }}
      >
        {/* translate-x-12 */}
        <div
          ref={bubble1Ref}
          className="sticky out-view w-[524px] scale-bubble mr-auto px-12 pt-16 pb-28 xl:px-16 xl:pt-12 flex justify-center items-center bg-[url('/about/bulle1.png')] bg-contain bg-center bg-no-repeat"
          style={{ top: `${bubbleTop}vh`, height: `${bubbleHeight}px` }}
        >
          <p className="licorice-font text-4.5xl xl:text-4xl font-semibold text-center text-pretty">
            <Trans
              i18nKey="common:about.bubble1"
              components={{ break: <br />, strong: <strong /> }}
            />
          </p>
        </div>
      </div>
      <div
        className="absolute -left-32 sm:left-0 w-[95%] sm:w-1/2"
        style={{
          top: `${bubble2CtnTop}px`,
          height: `${bubbleWrapperHeight}px`,
        }}
      >
        {/* -translate-x-40 */}
        <div
          ref={bubble2Ref}
          className="sticky out-view w-[538px] scale-bubble ml-auto px-12 pt-16 pb-28 flex justify-center items-center bg-[url('/about/bulle2.png')] bg-contain bg-center bg-no-repeat"
          style={{ top: `${bubbleTop}vh`, height: `${bubbleHeight}px` }}
        >
          <p className="licorice-font text-4.5xl xl:text-4xl font-semibold text-center text-pretty">
            <Trans
              i18nKey="common:about.bubble2"
              components={{ strong: <strong /> }}
            />
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;

// Pour la div contenant le background bulle, mettre des dimensions en px (ou em?) qui correspondent à l'aspect ratio de la bulle
// Background bulle bg-contain
// Top en vh pour que les éléments soient tjs à la même hauteur quelle que soit la hauteur de l'écran
