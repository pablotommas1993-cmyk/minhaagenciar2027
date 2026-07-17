import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const images = [
  { url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80', name: 'services-1' },
  { url: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80', name: 'services-2' },
  { url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80', name: 'services-3' },
  { url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80', name: 'services-4' },
  { url: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=80', name: 'services-5' },
  { url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80', name: 'services-6' },
  { url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80', name: 'portfolio-1' },
  { url: 'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&w=800&q=80', name: 'portfolio-2' },
  { url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80', name: 'portfolio-3' },
  { url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80', name: 'portfolio-4' },
  { url: 'https://images.unsplash.com/photo-1600267175161-cfaa711b4a81?auto=format&fit=crop&w=800&q=80', name: 'about-1' }
];

const targetDir = path.join(process.cwd(), 'public', 'images');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

async function downloadImages() {
  for (const img of images) {
    try {
      console.log(`Downloading ${img.name}...`);
      const response = await fetch(img.url);
      const buffer = Buffer.from(await response.arrayBuffer());
      
      console.log(`Processing ${img.name}...`);
      await sharp(buffer)
        .webp({ quality: 80, effort: 6 })
        .toFile(path.join(targetDir, `${img.name}.webp`));
      
      console.log(`Saved ${img.name}.webp`);
    } catch (e) {
      console.error(`Failed to process ${img.name}:`, e);
    }
  }
}

downloadImages();
