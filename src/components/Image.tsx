import Image, { ImageProps } from 'next/image';
import type { FC, SyntheticEvent } from 'react';
import { useEffect, useState } from 'react';
import fallbackImage from '../../public/fallback.svg';

interface ImageWithFallbackProps extends ImageProps {
  fallback?: ImageProps['src'];
}

const ImageWithFallback: FC<ImageWithFallbackProps> = ({
  fallback = fallbackImage,
  alt,
  src,
  className,
  ...props
}) => {
  const [error, setError] = useState<SyntheticEvent<
    HTMLImageElement,
    Event
  > | null>(null);

  useEffect(() => {
    setError(null);
  }, [src]);

  return (
    <Image
      alt={alt}
      onError={setError}
      src={error ? fallback : src}
      className={
        error
          ? `${className} bg-gray-100 dark:bg-gray-800 object-scale-down aspect-[2/3]`
          : className
      }
      {...props}
    />
  );
};

export default ImageWithFallback;
