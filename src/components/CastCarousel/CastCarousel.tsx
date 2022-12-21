import type { IMovieCredits, ITvShowCredits } from '@/types/credits';
import type { FC } from 'react';
import CastCard from './CastCard';
import { SwiperSlide } from 'swiper/react';
import Empty from '@/components/Empty';
import SwiperLazy from '@/components/SwiperLazy';

interface CastListProps {
  credits: ITvShowCredits | IMovieCredits;
  title: string;
}

const CastCarousel: FC<CastListProps> = ({ credits, title }) => {
  return (
    <div className='py-4 md:py-10'>
      <h2 className='mb-4 text-center text-3xl font-semibold dark:text-white md:text-4xl'>
        {title}
      </h2>
      {credits.cast.length > 0 ? (
        <SwiperLazy>
          {credits &&
            credits.cast.map((person) => {
              // check if array have person who performed two roles in the movie
              // and if there is, then we will not show him in the cast list
              // because it will be a duplicate
              const isDuplicate = credits.cast.some(
                (item) =>
                  item.name === person.name &&
                  item.character !== person.character
              );
              if (!isDuplicate) {
                return (
                  <SwiperSlide key={person.id}>
                    <CastCard person={person} />
                  </SwiperSlide>
                );
              }
            })}
        </SwiperLazy>
      ) : (
        <Empty description='No cast found' />
      )}
    </div>
  );
};

export default CastCarousel;
