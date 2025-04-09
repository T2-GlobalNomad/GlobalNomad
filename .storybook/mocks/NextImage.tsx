import React from 'react';

// ✅ 타입 명확하게 지정
import type { ImgHTMLAttributes } from 'react';

const NextImage = (props: ImgHTMLAttributes<HTMLImageElement>) => {
  return <img {...props} />;
};

export default NextImage;
