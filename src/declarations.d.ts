declare module '*.css';

declare module 'swiper/react' {
  import { SwiperOptions } from 'swiper/types';
  import { ReactElement } from 'react';
  
  export interface SwiperProps extends SwiperOptions {
    children: ReactElement[];
  }
  
  export const Swiper: React.FC<SwiperProps>;
  export const SwiperSlide: React.FC<{ children: ReactElement }>;
}

declare module 'swiper/css';
declare module 'swiper/css/navigation';
declare module 'swiper/css/pagination';
declare module 'swiper/modules';