import Image, { ImageProps } from 'next/legacy/image';
import type { FC, SyntheticEvent } from 'react';
import { useEffect, useState } from 'react';
import fallbackImage from '../../public/fallback.jpeg';

interface ImageLegacyWithFallbackProps extends ImageProps {
  fallback?: ImageProps['src'];
}

// Note: This is a legacy version of the Image component.
// It is recommended to use the new Image component instead.
// But for proper blur shimmers animation, we need to use the legacy version.

const ImageLegacyWithFallback: FC<ImageLegacyWithFallbackProps> = ({
  fallback = fallbackImage,
  alt,
  src,
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
      {...props}
    />
  );
};

export default ImageLegacyWithFallback;
