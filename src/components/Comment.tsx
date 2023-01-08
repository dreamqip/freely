import type { FC } from 'react';
import type { IReview } from '@/types/reviews';
import ImageWithFallback from '@/components/Image';
import { useEffect, useRef, useState } from 'react';

interface Props {
  review: IReview;
}

const maxHeight = 96;

const Comment: FC<Props> = ({ review }) => {
  const [showMore, setShowMore] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (contentRef.current) {
      const { scrollHeight } = contentRef.current;
      if (scrollHeight > maxHeight) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
    }
  }, []);

  const toggleShowMore = () => {
    setCollapsed((prevState) => !prevState);
    if (contentRef.current && collapsed) {
      contentRef.current?.style.setProperty('--line-clamp', 'unset');
    } else {
      contentRef.current?.style.setProperty('--line-clamp', '3');
    }
  };

  return (
    <div className='relative mb-4 flex last:mb-0'>
      <div className='mr-2 md:mr-4'>
        <div className='h-8 w-8 md:h-[40px] md:w-[40px]'>
          <ImageWithFallback
            className='rounded-full object-cover'
            src={`https://ui-avatars.com/api/?rounded=true&name=${review.author}&background=random`}
            alt={review.author}
            width={40}
            height={40}
          />
        </div>
      </div>
      <div className='flex flex-col gap-y-1'>
        <h3 className='md:text-md text-sm font-medium dark:text-primary-dark'>
          {review.author}
        </h3>
        <div>
          <div
            ref={contentRef}
            className='expander text-sm leading-8 dark:text-white'
          >
            {review.content}
          </div>
          {showMore && (
            <button
              className='mt-1 text-sm font-medium text-gray-400 hover:underline'
              onClick={toggleShowMore}
            >
              {collapsed ? 'Read more' : 'Show less'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
