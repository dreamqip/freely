import { type FC, useEffect, useState } from 'react';
import type { ITvShow } from '@/types/series';
import { LazyMotion, m, useMotionValue, useScroll } from 'framer-motion';
import { animationVariants } from '@/utilities/animationVariants';
import { PlayIcon } from '@heroicons/react/24/solid';
import { loadFeatures } from '@/utilities/loadAnimationFeatures';
import { imageBaseUrlHd, imageBaseUrlOriginal } from '@/services/themoviedb';
import { getSeriesSeasonsLength } from '@/utilities/getSeriesSeasons';
import ImageWithFallback from '@/components/Image';
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';

export interface IHeroProps {
  series: ITvShow;
}

const Hero: FC<IHeroProps> = ({ series }) => {
  const [loaded, setLoaded] = useState(false);
  const [loadedLogo, setLoadedLogo] = useState(false);
  const { scrollYProgress } = useScroll();
  const scrollProgress = useMotionValue(1);

  useIsomorphicLayoutEffect(() => {
    setLoaded(false);
    setLoadedLogo(false);
  }, [series]);

  useEffect(() => {
    if (loaded) {
      scrollYProgress.on('change', (latestValue) => {
        const newProgress = Math.max(1 - 8 * latestValue, 0.2);
        scrollProgress.set(newProgress);
      });
    }

    return () => scrollYProgress.clearListeners();
  }, [scrollProgress, scrollYProgress, loaded]);

  const seasons = getSeriesSeasonsLength(series.seasons);

  const countAverageEpisodesPerSeason = () => {
    const totalEpisodes = series.seasons.reduce(
      (acc, season) =>
        acc + (season.name === 'Specials' ? 0 : season.episode_count),
      0
    );

    return '~' + Math.round(totalEpisodes / seasons) + ' episodes per season';
  };

  return (
    <>
      <LazyMotion features={loadFeatures}>
        <m.div
          initial='hidden'
          animate={loaded ? 'visible' : 'hidden'}
          variants={animationVariants}
          transition={{ ease: 'easeInOut', duration: 0.75 }}
          className='pointer-events-none overflow-hidden fixed top-0 right-0 left-0 md:bottom-0 -z-10 select-none w-full'
          style={{ opacity: scrollProgress }}
        >
          <ImageWithFallback
            src={`${imageBaseUrlOriginal}${series.backdrop_path}`}
            alt={series?.name}
            fill
            priority
            className='aspect-video object-cover w-screen h-auto relative md:absolute'
            onLoadingComplete={() => setLoaded(true)}
          />
          <div className='absolute inset-0 bg-radial-gradient'></div>
        </m.div>
      </LazyMotion>

      <div className='relative'>
        <div className='max-w-xl text-sm md:text-base'>
          {series?.images?.logos && series?.images?.logos.length > 0 ? (
            <div className='pb-6 pt-14'>
              <LazyMotion features={loadFeatures}>
                <m.div
                  initial='hidden'
                  animate={loadedLogo ? 'visible' : 'hidden'}
                  variants={animationVariants}
                  transition={{
                    ease: 'easeInOut',
                    duration: 1,
                  }}
                  className='relative max-w-[180px] min-h-[170px] md:max-w-[341px]'
                >
                  <ImageWithFallback
                    alt={series?.name}
                    fill
                    priority
                    sizes='(min-width: 780px) 341px, 180px'
                    className='object-contain object-center'
                    src={`${imageBaseUrlHd}${series?.images?.logos[0].file_path}`}
                    onLoadingComplete={() => setLoadedLogo(true)}
                  />
                </m.div>
              </LazyMotion>
            </div>
          ) : (
            <h1 className='m-0 py-6 text-2xl text-white md:py-10 md:text-5xl'>
              {series?.name}
            </h1>
          )}
          <div className='font-light tracking-widest text-white'>
            {seasons} {seasons === 1 ? 'Season' : 'Seasons'} (
            {countAverageEpisodesPerSeason()})
          </div>
          <div className='flex items-center mt-2'>
            {series.first_air_date && (
              <div className='font-light tracking-widest text-white'>
                {new Date(series.first_air_date).getFullYear()}
              </div>
            )}
          </div>
          <div className='my-4 leading-6 font-light tracking-widest text-white'>
            {series?.genres?.map((genre) => genre.name).join(', ')}
          </div>
          <button className='play-btn cursor-not-allowed' disabled>
            <PlayIcon className='h-10 w-10 fill-current' />
            <span className='ml-2'>play</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Hero;
