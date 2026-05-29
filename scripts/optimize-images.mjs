import sharp from 'sharp';

const HERO_SRC = 'public/assets/cluster_marocco.webp';

await sharp(HERO_SRC).resize(640).webp({ quality: 72 }).toFile('public/assets/cluster_marocco-640.webp');
await sharp(HERO_SRC).resize(828).webp({ quality: 75 }).toFile('public/assets/cluster_marocco-828.webp');
await sharp('public/assets/logo.webp').resize(64).webp({ quality: 80 }).toFile('public/assets/favicon.webp');

console.log('Optimized hero variants + favicon written to public/assets/');
