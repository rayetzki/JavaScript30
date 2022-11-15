import { readdir, stat } from 'fs/promises';
import { parse } from 'path'

let all = 0;
let finished = -1;

try {
  const allFiles = await readdir('./');
  
  for await (const dir of allFiles) {
    const stats = await stat(dir);
    if (stats.isDirectory()) {
      const files = await readdir(dir);
      const ready = files.filter(file => file.includes('FINISHED') || file.includes('START'));
      if (ready.length === 0) finished++;
      if (files.some(file => parse(file).ext.includes('html') && parse(file).name.includes('index'))) all++;
    };
  }

  console.info(`Challenges: ${finished} out of ${all} finished. ${all - finished} to go!`);
} catch (err) {
  console.error('Current directory could not be read');
}