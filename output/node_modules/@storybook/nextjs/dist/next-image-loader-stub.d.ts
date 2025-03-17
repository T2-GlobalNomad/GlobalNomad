import { NextConfig } from 'next';
import { RawLoaderDefinition } from 'webpack';

interface LoaderOptions {
    filename: string;
    nextConfig: NextConfig;
}
declare const nextImageLoaderStub: RawLoaderDefinition<LoaderOptions>;

export { nextImageLoaderStub as default };
