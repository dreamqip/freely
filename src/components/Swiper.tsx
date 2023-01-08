import type { FC, PropsWithChildren } from 'react';
import { useEffect, useRef } from 'react';
import { Swiper as SwiperJS, SwiperRef } from 'swiper/react';
import { swiperOptions } from '@/utilities/swiperConfig';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';

const Swiper: FC<PropsWithChildren> = ({ children }) => {
  const swiperRef = useRef<SwiperRef | null>(null);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (swiperRef.current) {
      timeout = setTimeout(() => {
        swiperRef.current?.swiper.translateTo(0, 0);
      });
    }

    return () => clearTimeout(timeout);
  }, [swiperRef, children]);

  return (
    <SwiperJS ref={swiperRef} className='py-4 px-2' {...swiperOptions}>
      {children}
    </SwiperJS>
  );
};

export default Swiper;
