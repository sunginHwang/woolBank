import React from 'react';
import { IIcon } from '../../models/icon/IIcon';

function IcoUpCircle({
                       width = 24,
                       height = 24,
                       fill = 'currentColor'
                     }: IIcon) {
  return (
    <svg version="1.1" width={width} height={height}
         viewBox="0 0 24 24">
      <path
        fill={fill}
        d="M22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12M20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12M7.4,15.4L12,10.8L16.6,15.4L18,14L12,8L6,14L7.4,15.4Z"/>
    </svg>
  );
}

export default IcoUpCircle;