import * as React from 'react';
import { Addon_StoryContext } from 'storybook/internal/types';

declare const ImageDecorator: (Story: React.FC, { parameters }: Addon_StoryContext) => React.ReactNode;

export { ImageDecorator };
