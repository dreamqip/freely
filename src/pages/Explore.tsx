import type { FC } from 'react';
import Image from 'next/image';
import explore from '../../public/explore.png';
import { LazyMotion, m } from 'framer-motion';
import { loadFeatures } from '@/utilities/loadAnimationFeatures';
import { whileInViewportVariants } from '@/utilities/animationVariants';

const Explore: FC = () => {
  return (
    <LazyMotion features={loadFeatures}>
      <m.section
        initial='offscreen'
        whileInView='onscreen'
        viewport={{ once: true }}
        variants={whileInViewportVariants}
        className='relative flex flex-col items-center justify-center pt-16 md:min-h-[400px] md:flex-row'
      >
        <div className='max-w-xl'>
          <h2 className='m-0 text-center text-4xl font-semibold dark:text-white sm:text-5xl md:text-left lg:text-6xl xl:text-7xl'>
            Explore.
          </h2>
          <h3 className='m-0 mt-6 text-center text-xl font-medium leading-6 tracking-tight dark:text-white md:text-left md:text-3xl'>
            Millions of movies, TV shows and people
          </h3>
        </div>
        <Image
          src={explore}
          alt='explore movies, tv shows and people from all over the world and from any device you want to'
          priority
          placeholder='blur'
          sizes='(max-width: 480px) 100vw, 50vw'
          width={800}
          height={400}
          className='aspect-video'
        />
      </m.section>
    </LazyMotion>
  );
};

export default Explore;
