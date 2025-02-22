'use client';

import { homeSectionIds } from '@/config/config.global';

const PagesOverview = () => {
  return (
    <div className="h-screen">
      <section
        id={homeSectionIds.secondSection}
        className="flex flex-col section-pt pb-10 xl:pb-12 3xl:pb-16"
      >
        <h2 className="mb-10 py-4 pl-16">
          Bienvenue dans mon atelier, source de rêves crayonnés
        </h2>
        <div className="flex flex-col items-center gap-5">
          <section>Illustratrice Jeunesse</section>
          <section>Bande dessinée</section>
          <section>Fantasy</section>
        </div>
      </section>
      <section className="flex flex-col pt-10 xl:pt-12 3xl:pt-16 pb-10 xl:pb-12 3xl:pb-16">
        <h2 className="mb-10 py-4 pl-16">Découvrez ma boutique en ligne</h2>
        <div className="flex max-sm:flex-col justify-center sm:justify-around items-center gap-5"></div>
      </section>
      <section className="flex flex-col pt-10 xl:pt-12 3xl:pt-16 pb-10 xl:pb-12 3xl:pb-16">
        <h2 className="mb-10 py-4 pl-16">Qui suis-je ?</h2>
        <div className="flex max-sm:flex-col justify-center sm:justify-around items-center gap-5"></div>
      </section>
      <section className="flex flex-col pt-10 xl:pt-12 3xl:pt-16 pb-10 xl:pb-12 3xl:pb-16">
        <h2 className="mb-10 py-4 pl-16"></h2>
        <div className="flex max-sm:flex-col justify-center sm:justify-around items-center gap-5"></div>
      </section>
    </div>
  );
};

export default PagesOverview;
