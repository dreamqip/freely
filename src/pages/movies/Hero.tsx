import type { FC } from 'react';
import type { IMovie } from '@/types/movie';
import { useEffect, useState } from 'react';
import { LazyMotion, m, useMotionValue, useScroll } from 'framer-motion';
import { animationVariants } from '@/utilities/animationVariants';
import { PlayIcon } from '@heroicons/react/24/solid';
import { loadFeatures } from '@/utilities/loadAnimationFeatures';
import { imageBaseUrlHd } from '@/services/themoviedb';
import ImageWithFallback from '@/components/Image';

interface IHeroProps {
  movie: IMovie;
}

const Hero: FC<IHeroProps> = ({ movie }) => {
  const [loaded, setLoaded] = useState(false);
  const [loadedLogo, setLoadedLogo] = useState(false);
  const { scrollYProgress } = useScroll();
  const scrollProgress = useMotionValue(1);

  useEffect(() => {
    setLoaded(false);
    setLoadedLogo(false);
  }, [movie]);

  useEffect(() => {
    if (loaded) {
      scrollYProgress.on('change', (latestValue) => {
        const newProgress = Math.max(1 - 8 * latestValue, 0.2);
        scrollProgress.set(newProgress);
      });
    }

    return () => scrollYProgress.clearListeners();
  }, [scrollProgress, scrollYProgress, loaded]);

  return (
    <>
      <LazyMotion strict features={loadFeatures}>
        <m.div
          initial='hidden'
          animate={loaded ? 'visible' : 'hidden'}
          variants={animationVariants}
          transition={{ ease: 'easeInOut', duration: 0.75 }}
          className='pointer-events-none fixed top-0 right-0 left-0 md:bottom-0 -z-10 select-none w-full'
          style={{ opacity: scrollProgress }}
        >
          <ImageWithFallback
            src={`${imageBaseUrlHd}${movie.backdrop_path}`}
            alt={movie.title}
            fill
            priority
            sizes='100vw'
            className='aspect-video object-cover w-screen h-auto relative md:absolute'
            onLoadingComplete={() => setLoaded(true)}
          />
          <div className='absolute inset-0 bg-radial-gradient'></div>
        </m.div>
      </LazyMotion>
      <div className='relative'>
        <div className='max-w-xl text-sm md:text-base'>
          {movie?.images?.logos && movie.images.logos.length > 0 ? (
            <div className='pb-6 pt-14'>
              <LazyMotion features={loadFeatures}>
                <m.div
                  initial='hidden'
                  animate={loadedLogo ? 'visible' : 'hidden'}
                  variants={animationVariants}
                  className='relative max-w-[180px] min-h-[170px] md:max-w-[341px]'
                >
                  <ImageWithFallback
                    alt={movie.title}
                    priority
                    fill
                    sizes='(min-width: 768px) 341px, 180px'
                    className='object-contain object-center'
                    src={`${imageBaseUrlHd}${movie?.images?.logos[0].file_path}`}
                    onLoadingComplete={() => setLoadedLogo(true)}
                  />
                </m.div>
              </LazyMotion>
            </div>
          ) : (
            <h1 className='m-0 py-6 text-2xl text-white md:py-10 md:text-5xl'>
              {movie?.title}
            </h1>
          )}
          <div className='my-4 leading-6 tracking-widest text-white'>
            {movie?.genres?.map((genre) => genre.name).join(', ')}
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
