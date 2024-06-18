import Image from "next/image";
import { useState, useEffect } from "react";

const opacityTransitionDuration: number = 700;

const About: React.FC =  () => {

    const [heightLvl, setHeightLvl] = useState(0);
    const [is1stBubbleVisible, setIs1stBubbleVisible] = useState<boolean>(false);
    const [is2ndBubbleVisible, setIs2ndBubbleVisible] = useState<boolean>(false);
    console.log(heightLvl)

    useEffect(() => {
        function handleScroll (){
            setHeightLvl(window.scrollY);
            if(window.scrollY > 6400 && window.scrollY < 7100) {
                setIs1stBubbleVisible(true);
                setIs2ndBubbleVisible(false);
            } else if(window.scrollY >= 7100 && window.scrollY < 7800) {
                setIs1stBubbleVisible(false);
                setIs2ndBubbleVisible(true);
            } else {
                setIs1stBubbleVisible(false);
                setIs2ndBubbleVisible(false);
            }
        }

        window.addEventListener('scroll', handleScroll);

        return (() => window.removeEventListener('scroll', handleScroll));
    }, []);

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
                        {is1stBubbleVisible &&
                            <div className={`absolute -right-[80%] bottom-1/2 w-[120%] h-[120%] flex justify-center items-center bg-[url('/about/bulle1.png')] bg-contain bg-center bg-no-repeat transition-opacity duration-${opacityTransitionDuration} ${is1stBubbleVisible ? "opacity-100" : "opacity-0"}`}>
                                <p className={`w-[75%] h-[30%] mb-12 licorice-font text-3xl font-semibold text-center`}>
                                    Je m'appelle Amaia et je suis dessinatrice.<br/>
                                    Je fais des illustrations jeunesse, fantasy ainsi que des BD humoristiques.
                                </p>
                            </div>
                        }
                        {is2ndBubbleVisible &&
                            <div className={`absolute right-[60%] bottom-1/2 w-[120%] h-[120%] flex justify-center items-center bg-[url('/about/bulle2.png')] bg-contain bg-center bg-no-repeat transition-opacity duration-${opacityTransitionDuration} ${is2ndBubbleVisible ? "opacity-100" : "opacity-0"}`}>
                                <p className="w-[70%] h-[30%] mb-6 mr-4 licorice-font text-3xl font-semibold text-center">
                                    Je suis bascophone, et j'aime illustrer également ce qui a un rapport avec la mythologie et la culture basque.
                                </p>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;