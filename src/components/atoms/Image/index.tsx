import { InputHTMLAttributes } from 'react';

interface IProps extends InputHTMLAttributes<HTMLImageElement> {
  webpSrc?: string;
}
/**
 * 공통 - Image 컴포넌트 (webp 지원용도)
 * @component
 */

function Image({ webpSrc, alt, ...props }: IProps) {
  return (
    <picture>
      {webpSrc && <source type='image/webp' srcSet={webpSrc} />}
      <img alt={alt || ''} {...props} />
    </picture>
  );
}

export default Image;
