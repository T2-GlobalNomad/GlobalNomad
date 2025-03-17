import { Addon_DecoratorFunction, Addon_LoaderFunction } from 'storybook/internal/types';

declare const decorators: Addon_DecoratorFunction<any>[];
declare const loaders: Addon_LoaderFunction;
declare const parameters: {
    docs: {
        source: {
            excludeDecorators: boolean;
        };
    };
    react: {
        rootOptions: {
            onCaughtError(error: unknown): void;
        };
    };
};

export { decorators, loaders, parameters };
