'use client';

import LoadableImage from '@/components/LoadableImage';
import { newsArticle } from '@/types';
import removeContextMenu from '@/utils/removeContextMenu';
import Link from 'next/link';
import React from 'react';

type NewsClientProps = {
  articles: newsArticle[] | null;
};

const NewsClient: React.FC<NewsClientProps> = ({ articles }) => {
  const articlesJSX =
    articles === null
      ? []
      : articles.map((article, i) => {
          const { img, title, content, linkText, link } = article;
          const { formats, ...imgProps } = img;
          const contentJSX = content
            .split('\n')
            .map((line, index) => <div key={index}>{line || <br />}</div>);
          return (
            <div
              key={i}
              className="flex flex-col gap-8 items-center w-full sm:w-[35rem] lg:w-[45rem] px-2 xs:px-4 sm:px-0"
            >
              <div className="sm:w-3/5 lg:w-1/2">
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
              <hr className="w-full my-6 border border-gray-400" />
            </div>
          );
        });

  return (
    <div className="relative flex-1 flex flex-col items-center gap-5 sm:gap-10">
      <h1 className="text-primary-600 regards text-4xl sm:text-4.5xl 2xl:text-5xl underline-custom after:h-[0.28rem] after:bottom-0">
        Nouveautés
      </h1>
      {articlesJSX}
    </div>
  );
};

export default NewsClient;
