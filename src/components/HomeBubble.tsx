import { mobileBreakpoint } from '@/data/breakpoints';
import useViewportWidth from '@/hooks/useViewportWidth';
import { t } from 'i18next';
import React, { useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';

const HomeBubble = ({ idx }: { idx: number }) => {
  useTranslation();
  const windowWidth = useViewportWidth();

  const bubbles = t('common:home.bubbles', { returnObjects: true }) as {
    [key: string]: string[];
  };
  const desktopBubbleText = bubbles.desktop[idx];
  const mobileBubbleText = bubbles.mobile[idx];

  return (
    <div className="sm:aspect-square flex items-center text-xl xs:text-2xl sm:text-2.5xl xl:text-2.5xl 3xl:text-3.5xl text-center sm:bg-white/30 sm:backdrop-blur-sm sm:border-2 border-black rounded-lg sm:rounded-full py-4 sm:py-5 px-7 transition-all duration-[1500ms]">
      {windowWidth < mobileBreakpoint ? (
        <Trans i18nKey={mobileBubbleText} components={{ strong: <strong /> }} />
      ) : (
        <Trans
          i18nKey={desktopBubbleText}
          components={{ strong: <strong /> }}
        />
      )}
    </div>
  );
};

export default HomeBubble;
