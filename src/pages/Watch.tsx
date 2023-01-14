import type { FC } from 'react';
import Image from 'next/image';
import devices from '../../public/devices.png';
import { LazyMotion, m } from 'framer-motion';
import { loadFeatures } from '@/utilities/loadAnimationFeatures';
import { whileInViewportVariants2 } from '@/utilities/animationVariants';

const Watch: FC = () => {
  return (
    <LazyMotion features={loadFeatures}>
      <m.section
        variants={whileInViewportVariants2}
        initial='offscreen'
        whileInView='onscreen'
        viewport={{ once: true }}
        className='flex flex-col items-center justify-center pt-16 md:min-h-[400px] md:flex-row-reverse'
      >
        <div className='max-w-xl'>
          <h2 className='m-0 text-center text-4xl font-semibold dark:text-white sm:text-5xl md:text-left lg:text-6xl xl:text-7xl'>
            Watch everywhere.
          </h2>
          <h3 className='m-0 mt-6 text-center text-xl font-medium tracking-tight dark:text-white md:text-left md:text-3xl'>
            Stream unlimited movies and TV shows on your phone, tablet, or
            laptop.
          </h3>
        </div>
        <Image
          src={devices}
          alt='watch everywhere and from any device you want to'
          placeholder='blur'
          width={600}
          height={400}
          sizes='(max-width: 480px) 100vw, 50vw'
          className='aspect-[4/3]'
        />
      </m.section>
    </LazyMotion>
  );
};

export default Watch;
