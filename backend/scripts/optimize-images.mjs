import sharp from 'sharp';

const ASSETS = 'backend/public/assets';

const HERO_SRC = `${ASSETS}/cluster_marocco.webp`;
const STELLAR_SRC = `${ASSETS}/stellar_avenue.webp`;

await sharp(HERO_SRC).resize(640).webp({ quality: 72 }).toFile(`${ASSETS}/cluster_marocco-640.webp`);
await sharp(HERO_SRC).resize(828).webp({ quality: 75 }).toFile(`${ASSETS}/cluster_marocco-828.webp`);

await sharp(STELLAR_SRC).resize(640).webp({ quality: 72 }).toFile(`${ASSETS}/stellar_avenue-640.webp`);
await sharp(STELLAR_SRC).resize(828).webp({ quality: 75 }).toFile(`${ASSETS}/stellar_avenue-828.webp`);
await sharp(STELLAR_SRC).resize(1024).webp({ quality: 78 }).toFile(`${ASSETS}/stellar_avenue-1024.webp`);

await sharp(`${ASSETS}/logo.webp`).resize(64).webp({ quality: 80 }).toFile(`${ASSETS}/favicon.webp`);

console.log('Optimized image variants written to backend/public/assets/');
