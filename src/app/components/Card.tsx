import Button from './Button';
import Image from 'next/image';
import { useState } from 'react';

type CardProps = {
  content: string;
  img?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  btnText?: string;
};

const Card: React.FC<CardProps> = ({ content, img, btnText }) => {
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  const contentJSX = content
    .split('\n')
    .map((line: string, i: number, linesTable) => {
      if (i !== linesTable.length - 1) {
        return (
          <span key={i}>
            {line}
            <br />
            <br />
          </span>
        );
      } else {
        return <span key={i}>{line}</span>;
      }
    });

  return (
    <div
      className={`w-full xl:w-[85%] 2xl:w-[60%] 3xl:w-1/2 p-4 md:p-6 flex max-sm:flex-col max-sm:items-center gap-8 bg-surface-200 border-2 border-surface-300 rounded-md shadow-xl cursor-pointer hover:${
        !isButtonHovered ? 'brightness-90' : ''
      }`}
    >
      {img && (
        <div className="w-4/5 sm:w-2/5 flex justify-center items-center">
          <Image
            src={img.src}
            alt={img.alt}
            width={img.width}
            height={img.height}
            className="size-full object-contain"
          />
        </div>
      )}
      <div className="w-full sm:w-3/5 flex flex-col gap-6 sm:px-8 sm:pt-8">
        <p className="flex-1 flex flex-col justify-center items-center">
          {contentJSX}
        </p>
        {btnText && (
          <div className="text-end">
            <Button
              onMouseEnter={() => setIsButtonHovered(true)}
              onMouseLeave={() => setIsButtonHovered(false)}
              className="hover:brightness-50"
            >
              {btnText}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
