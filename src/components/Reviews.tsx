import type { FC } from 'react';
import type { IReviews } from '@/types/reviews';
import dynamic from 'next/dynamic';

const Comment = dynamic(() => import('@/components/Comment'));
const Empty = dynamic(() => import('@/components/Empty'));

interface Props {
  reviews: IReviews;
}

const Reviews: FC<Props> = ({ reviews }) => {
  return (
    <div className='py-4 md:py-10'>
      <h2 className='mb-4 text-center text-3xl font-semibold dark:text-white md:text-4xl'>
        Reviews
      </h2>
      {reviews.results.length > 0 ? (
        <div>
          {reviews.results.map((review) => (
            <Comment review={review} key={review.id} />
          ))}
        </div>
      ) : (
        <Empty message='No reviews found' />
      )}
    </div>
  );
};

export default Reviews;
