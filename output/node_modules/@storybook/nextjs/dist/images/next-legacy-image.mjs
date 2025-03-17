import { defaultLoader } from '../chunk-ETFXNGLC.mjs';
import '../chunk-42AJV46F.mjs';
import React from 'react';
import { ImageContext as ImageContext$1 } from '@storybook/nextjs/dist/image-context';
import OriginalNextLegacyImage from 'sb-original/next/legacy/image';

var ImageContext=ImageContext$1;function NextLegacyImage({loader,...props}){let imageParameters=React.useContext(ImageContext);return React.createElement(OriginalNextLegacyImage,{...imageParameters,...props,loader:loader??defaultLoader})}var next_legacy_image_default=NextLegacyImage;

export { next_legacy_image_default as default };
