import { InvalidEvent } from 'react';
export const onImageFallback = (e: InvalidEvent<HTMLImageElement>) => {
  e.target.src = 'https://miro.medium.com/max/500/1*V9haN1irZjXH3uRae3a7Ew.jpeg';
};
