import type { FC } from 'react';
import type { ISearchPerson } from '@/types/person';
import type { MixedShow } from '@/types/search';
import { memo, useState } from 'react';
import { LazyMotion, m } from 'framer-motion';
import { animationVariants } from '@/utilities/animationVariants';
import { loadFeatures } from '@/utilities/loadAnimationFeatures';
import ImageWithFallback from '@/components/Image';
import { imageBaseUrlW400 } from '@/services/themoviedb';

interface Props {
  show: MixedShow | ISearchPerson;
}

const ShowImage: FC<Props> = ({ show }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <LazyMotion strict features={loadFeatures}>
      <m.div
        className='overflow-hidden rounded-md'
        initial='hidden'
        animate={loaded ? 'visible' : 'hidden'}
        variants={animationVariants}
        transition={{ ease: 'easeOut', duration: 1.25 }}
      >
        <ImageWithFallback
          className='aspect-[2/3] object-cover'
          src={`${imageBaseUrlW400}${
            show.media_type === 'person'
              ? 'profile_path' in show && show.profile_path
              : 'poster_path' in show && show.poster_path
          }`}
          width={400}
          height={600}
          sizes='(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 10vw'
          alt={
            ('title' in show && show.title) ||
            show.name ||
            (show as ISearchPerson).name
          }
          onLoadingComplete={() => setLoaded(true)}
        />
      </m.div>
    </LazyMotion>
  );
};

export default memo(ShowImage);
