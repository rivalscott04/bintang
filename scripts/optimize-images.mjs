import sharp from 'sharp';

const HERO_SRC = 'public/assets/cluster_marocco.webp';
const STELLAR_SRC = 'public/assets/stellar_avenue.webp';

await sharp(HERO_SRC).resize(640).webp({ quality: 72 }).toFile('public/assets/cluster_marocco-640.webp');
await sharp(HERO_SRC).resize(828).webp({ quality: 75 }).toFile('public/assets/cluster_marocco-828.webp');

await sharp(STELLAR_SRC).resize(640).webp({ quality: 72 }).toFile('public/assets/stellar_avenue-640.webp');
await sharp(STELLAR_SRC).resize(828).webp({ quality: 75 }).toFile('public/assets/stellar_avenue-828.webp');
await sharp(STELLAR_SRC).resize(1024).webp({ quality: 78 }).toFile('public/assets/stellar_avenue-1024.webp');

await sharp('public/assets/logo.webp').resize(64).webp({ quality: 80 }).toFile('public/assets/favicon.webp');

console.log('Optimized image variants written to public/assets/');
