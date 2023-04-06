import type { FC } from 'react';
import type { LightboxExternalProps } from 'yet-another-react-lightbox';
import ReactLightbox from 'yet-another-react-lightbox';

import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';

import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import ImageLegacyWithFallback from '@/components/ImageLegacy';
import { shimmer, toBase64 } from '@/utilities/shimmer';

const Lightbox: FC<LightboxExternalProps> = ({
  open,
  index,
  close,
  slides,
}) => (
  <ReactLightbox
    open={open}
    index={index}
    plugins={[Thumbnails]}
    close={close}
    slides={slides}
    animation={{ swipe: 200 }}
    carousel={{ finite: true }}
    render={{
      slide: ({slide,rect }) => {
        let width = rect.width;
        let height = rect.height;

        if (slide.width && slide.height) {
          width = Math.round(
            Math.min(rect.width, (rect.height / slide.height) * slide.width)
          );
          height = Math.round(
            Math.min(rect.height, (rect.width / slide.width) * slide.height)
          );
        }

        return (
          <div style={{ position: 'relative', width, height }}>
            <ImageLegacyWithFallback
              layout='fill'
              src={slide.src}
              loading='eager'
              placeholder='blur'
              blurDataURL={`data:image/svg+xml;base64,${toBase64(
                shimmer(Number(width), Number(height))
              )}`}
              alt={slide.alt || ''}
              sizes={
                typeof window !== 'undefined'
                  ? `${Math.ceil((width / window.innerWidth) * 100)}vw`
                  : `${width}px`
              }
            />
          </div>
        );
      },
    }}
  />
);

export default Lightbox;
