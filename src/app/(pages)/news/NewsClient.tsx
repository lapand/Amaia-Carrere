'use client';

import LoadableImage from '@/components/LoadableImage';
import { newsArticle } from '@/types';
import removeContextMenu from '@/utils/removeContextMenu';
import Link from 'next/link';
import React from 'react';
import StaticSlider from '@/components/StaticSlider';
import { smBreakpoint } from '@/data/breakpoints';
import useViewportWidth from '@/hooks/useViewportWidth';

type NewsClientProps = {
  articles: newsArticle[] | null;
};

const NewsClient: React.FC<NewsClientProps> = ({ articles }) => {
  const windowWidth = useViewportWidth();

  const articlesJSX =
    articles === null
      ? []
      : articles.map((article, i) => {
          const { mainImg, title, content, linkText, link, gallery } = article;
          const { formats, ...imgProps } = mainImg;
          const contentJSX = content
            .split('\n')
            .map((line, index) => <div key={index}>{line || <br />}</div>);
          return (
            <div
              key={i}
              className="flex flex-col gap-10 sm:gap-16 items-center w-full sm:w-[35rem] lg:w-[45rem] px-2 xs:px-4 sm:px-0"
            >
              <div className="w-[90%] rounded-full overflow-hidden">
                <LoadableImage
                  className="size-full object-contain"
                  {...imgProps}
                  quality={100}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 37rem, 62rem"
                  priority={i === 0}
                  placeholder={formats?.thumbnail?.url ? 'blur' : undefined}
                  blurDataURL={formats?.thumbnail?.url}
                  onContextMenu={removeContextMenu}
                />
              </div>
              <div className="flex flex-col gap-8 items-center">
                <h2 className="text-2xl xs:text-2.5xl sm:text-3xl self-start regards">
                  {title}
                </h2>
                <p className="text-pretty">{contentJSX}</p>
                <Link
                  href={link}
                  target="_blank"
                  className="underline underline-offset-4 hover:text-secondary hover:scale-105 transition-transform duration-300"
                >
                  {linkText}
                </Link>
              </div>
              {gallery.length !== 0 && (
                <StaticSlider
                  className="w-[17rem] xs:w-[20rem] sm:w-[36rem] lg:w-[40rem] 3xl:w-[45rem]"
                  isControlArrowsVisible={windowWidth >= smBreakpoint}
                  isPaginationVisible
                  maxSlides={7}
                  transitionType="slide"
                  arrowBtnStyle={{
                    width: '4rem',
                    borderRadius: '0 200px 200px 0',
                    transitionDuration: '500ms',
                  }}
                  arrowBtnHoverStyle={{
                    backgroundColor: 'rgba(117,69,145,.3)',
                  }}
                  draggable
                >
                  {gallery.map((img, i) => (
                    <LoadableImage
                      key={i}
                      className="size-full object-contain"
                      {...img}
                      priority={i === 0}
                      onContextMenu={removeContextMenu}
                    />
                  ))}
                </StaticSlider>
              )}
              <hr className="w-full my-6 border border-gray-400" />
            </div>
          );
        });

  return (
    <div className="relative flex-1 flex flex-col items-center gap-10 lg:gap-16">
      <h1 className="text-primary-600 regards text-4xl sm:text-4.5xl 2xl:text-5xl underline-custom after:h-[0.28rem] after:bottom-0">
        Nouveautés
      </h1>
      {articlesJSX}
    </div>
  );
};

export default NewsClient;
