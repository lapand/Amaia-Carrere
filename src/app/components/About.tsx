import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

//

const About: React.FC = () => {
  const [heightLvl, setHeightLvl] = useState(0);

  const [isBubble1Opened, setIsBubble1Opened] = useState<boolean>(false);
  const [isBubble1Visible, setIsBubble1Visible] = useState<boolean>(false);
  const transiOffTimeoutIdRef = useRef<NodeJS.Timeout>(null);
  console.log(transiOffTimeoutIdRef.current);

  // const [is2ndBubbleOpened, setIs2ndBubbleOpened] = useState<boolean>(false);
  // const [is2ndBubbleVisible, setIs2ndBubbleVisible] = useState<boolean>(false);

  console.log(heightLvl, isBubble1Opened, isBubble1Visible);

  useEffect(() => {
    const handleScroll = () => {
      setHeightLvl(window.scrollY);
      if (window.scrollY > 6400 && window.scrollY < 7100) {
        openBubble();
      } else {
        closeBubble();
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isBubble1Opened]);

  const openBubble = () => {
    if (transiOffTimeoutIdRef.current) {
      clearTimeout(transiOffTimeoutIdRef.current);
      transiOffTimeoutIdRef.current = null;
      const transiInTimeoutId = setTimeout(() => {
        setIsBubble1Visible(true);
        clearTimeout(transiInTimeoutId);
      }, 100);
    }
    if (!isBubble1Opened) {
      setIsBubble1Opened(true);
      const transiInTimeoutId = setTimeout(() => {
        setIsBubble1Visible(true);
        clearTimeout(transiInTimeoutId);
      }, 100);
    }
  };

  const closeBubble = () => {
    if (isBubble1Opened && !transiOffTimeoutIdRef.current) {
      transiOffTimeoutIdRef.current = setTimeout(() => {
        setIsBubble1Opened(false);
        clearTimeout(transiOffTimeoutIdRef.current);
        transiOffTimeoutIdRef.current = null;
      }, 500);
      setIsBubble1Visible(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 m-32 mt-64">
      <div className="w-1/2 h-[200vh]">
        <div className="sticky top-96 flex justify-center">
          <div className="relative w-96 h-96 flex justify-center items-center">
            <Image
              src="/about/nain.png"
              alt="nain présentation"
              width={500}
              height={500}
              className="size-full object-contain"
            />
            {isBubble1Opened && (
              <div
                className={`absolute -right-[80%] bottom-1/2 w-[120%] h-[120%] flex justify-center items-center bg-[url('/about/bulle1.png')] bg-contain bg-center bg-no-repeat transition duration-700 ${
                  isBubble1Visible ? 'opacity-100' : 'opacity-0 -translate-x-10'
                }`}
              >
                <p
                  className={`w-[75%] h-[30%] mb-12 licorice-font text-3xl font-semibold text-center`}
                >
                  Je m'appelle Amaia et je suis dessinatrice.
                  <br />
                  Je fais des illustrations jeunesse, fantasy ainsi que des BD
                  humoristiques.
                </p>
              </div>
            )}
            {/* {is2ndBubbleOpened && (
              <div
                className={`absolute right-[60%] bottom-1/2 w-[120%] h-[120%] flex justify-center items-center bg-[url('/about/bulle2.png')] bg-contain bg-center bg-no-repeat transition-opacity duration-500 ${
                  is2ndBubbleVisible ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <p className="w-[70%] h-[30%] mb-6 mr-4 licorice-font text-3xl font-semibold text-center">
                  Je suis bascophone, et j'aime illustrer également ce qui a un
                  rapport avec la mythologie et la culture basque.
                </p>
              </div>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
