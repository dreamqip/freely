import type { FC } from 'react';
import Image from 'next/image';
import wanda from '../../public/wanda.jpeg';

const Hero: FC = () => {
  return (
    <div className='flex flex-col items-center justify-between md:flex-row'>
      <h1
        aria-label='Movie change the world'
        className='flex flex-col pt-20 text-center text-7xl font-extrabold tracking-tighter dark:text-white md:p-0 md:text-left md:text-8xl xl:text-9xl'
      >
        <span className='heading-line heading-line-first'>
          <span className='heading-line-gradient'>Movie</span>
        </span>
        <span className='heading-line heading-line-second'>
          <span className='heading-line-gradient'>Change</span>
        </span>
        <span className='heading-line heading-line-third'>
          <span className='heading-line-gradient'>The world</span>
        </span>
      </h1>
      <Image
        src={wanda}
        alt='Wanda Maximoff from MCU'
        sizes='(max-width: 768px) 0vw, (max-width: 1024px) 50vw, 33vw'
        width={400}
        height={600}
        placeholder='blur'
        priority
        className='hidden rounded-tr-full rounded-bl-full md:block'
      />
    </div>
  );
};

export default Hero;
