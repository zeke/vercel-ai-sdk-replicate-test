import  Replicate from "replicate"
import { replicate as replicateProvider } from '@ai-sdk/replicate';
import { experimental_generateImage as generateImage } from 'ai';
import { writeFile } from 'node:fs/promises';

const replicate = new Replicate()

const collection = await replicate.collections.get('text-to-image');

async function modelHasVersions(owner, name) {
    try {
        const response = await replicate.models.versions.list(owner, name);
        return true
    } catch (error) {
        return false
    }
}

for (const model of collection.models) {
    const { owner, name, url } = model
    const hasVersions = await modelHasVersions(owner, name)
    // console.log({url, hasVersions})

    if (hasVersions) {
        console.log(`${url} has versions, skipping...`)
        continue
    }

    console.log(`Generating image with ${url}...`)
    const { image } = await generateImage({
    model: replicateProvider.image(`${owner}/${name}`),
        prompt: 'The Loch Ness Monster getting a manicure',
    });

    const filename = `outputs/${owner}_${name}.webp`
    await writeFile(filename, image.uint8Array);

    console.log(`Image saved as ${filename}`);
}