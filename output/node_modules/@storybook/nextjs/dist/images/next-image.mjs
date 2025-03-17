import { defaultLoader } from '../chunk-ETFXNGLC.mjs';
import '../chunk-42AJV46F.mjs';
import React from 'react';
import { ImageContext as ImageContext$1 } from '@storybook/nextjs/dist/image-context';
import * as NextImageNamespace from 'sb-original/next/image';

var OriginalNextImage=NextImageNamespace.default,{getImageProps:originalGetImageProps}=NextImageNamespace,ImageContext=ImageContext$1,MockedNextImage=React.forwardRef(({loader,...props},ref)=>{let imageParameters=React.useContext(ImageContext);return React.createElement(OriginalNextImage,{ref,...imageParameters,...props,loader:loader??defaultLoader})});MockedNextImage.displayName="NextImage";var getImageProps=props=>originalGetImageProps?.({loader:defaultLoader,...props}),next_image_default=MockedNextImage;

export { next_image_default as default, getImageProps };
