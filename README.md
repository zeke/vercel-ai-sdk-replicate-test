# Vercel AI SDK - Replicate test

Test repo for trying out Replicate image generation models in Vercel's AI SDK

https://vercel.com/blog/ai-sdk-4-1

## How it works

The script downloads all the models in Replicate's [text-to-image collection](https://replicate.com/collections/text-to-image), filters out the models that have versions (which are not yet supported),and generates an image for each model using the AI SDK.

The images are saved in the `outputs` directory.

## Usage

```console
npm install
node index.js
```