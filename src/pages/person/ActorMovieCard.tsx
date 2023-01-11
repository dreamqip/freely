import type { FC } from 'react';
import { useState } from 'react';
import type { IActorCast } from '@/types/cast';
import Link from 'next/link';
import ImageWithFallback from '@/components/Image';
import { imageBaseUrlW400 } from '@/services/themoviedb';
import { LazyMotion, m } from 'framer-motion';
import { loadFeatures } from '@/utilities/loadAnimationFeatures';
import { animationVariants } from '@/utilities/animationVariants';

interface Props {
  show: IActorCast;
}

const ActorMovieCard: FC<Props> = ({ show }) => {
  const [loaded, setLoaded] = useState(false);

  if (show.media_type === 'tv') {
    return (
      <Link
        href={`/series/${show.id}`}
        className='flex cursor-pointer flex-col justify-center transition-all duration-300 ease-in-out hover:scale-105'
      >
        <>
          <span className='mb-6'>
            <LazyMotion strict features={loadFeatures}>
              <m.div
                className='overflow-hidden rounded-md'
                initial='hidden'
                animate={loaded ? 'visible' : 'hidden'}
                variants={animationVariants}
                transition={{ ease: 'easeOut', duration: 1.25 }}
              >
                <ImageWithFallback
                  src={`${imageBaseUrlW400}${show.poster_path}`}
                  width={400}
                  height={600}
                  className='aspect-[2/3] object-cover sm:rounded-lg'
                  alt={show.name}
                  onLoadingComplete={() => setLoaded(true)}
                />
              </m.div>
            </LazyMotion>
          </span>
          <div className='text-md truncate text-gray-500'>{show.character}</div>
        </>
      </Link>
    );
  }

  return (
    <Link
      href={`/movies/${show.id}`}
      className='flex cursor-pointer flex-col justify-center transition-all duration-300 ease-in-out hover:scale-105'
    >
      <>
        <span className='mb-6'>
          <LazyMotion strict features={loadFeatures}>
            <m.div
              className='overflow-hidden rounded-md'
              initial='hidden'
              animate={loaded ? 'visible' : 'hidden'}
              variants={animationVariants}
              transition={{ ease: 'easeOut', duration: 1.25 }}
            >
              <ImageWithFallback
                src={`${imageBaseUrlW400}${show.poster_path}`}
                width={400}
                height={600}
                className='aspect-[2/3] object-cover sm:rounded-lg'
                alt={'title' in show ? show.title : ''}
                onLoadingComplete={() => setLoaded(true)}
              />
            </m.div>
          </LazyMotion>
        </span>
        <div className='text-md truncate text-gray-500'>{show.character}</div>
      </>
    </Link>
  );
};

export default ActorMovieCard;
