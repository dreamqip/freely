import type { MixedShow } from '@/types/search';
import type { ITvShows } from '@/types/series';
import type { IMovies } from '@/types/movies';
import type { FC } from 'react';
import { SwiperSlide } from 'swiper/react';
import ShowCard from './ShowCard';
import Swiper from '@/components/Swiper';
import dynamic from 'next/dynamic';

const Empty = dynamic(() => import('@/components/Empty'));

interface Props {
  series: IMovies | ITvShows;
  title: string;
}

const ShowCarousel: FC<Props> = ({ series, title }) => {
  return (
    <div className='relative py-4 md:py-10'>
      <h2 className='mb-4 text-center text-3xl font-semibold dark:text-white md:text-4xl'>
        {title}
      </h2>
      {series && series.results.length > 0 ? (
        <Swiper>
          {series.results.map((show: MixedShow) => {
            return (
              <SwiperSlide key={show.id}>
                <ShowCard show={show}></ShowCard>
              </SwiperSlide>
            );
          })}
        </Swiper>
      ) : (
        <Empty message={`No ${title.toLowerCase()} shows found`} />
      )}
    </div>
  );
};

export default ShowCarousel;
