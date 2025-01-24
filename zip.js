import archiver from 'archiver';
import { createWriteStream } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const output = createWriteStream(join(__dirname, 'dist', 'ace-attorney-investigations-evidence.zip'));
const archive = archiver('zip', {
  zlib: { level: 9 }
});

output.on('close', function () {
  console.log(archive.pointer() + ' total bytes');
  console.log('archiver has been finalized and the output file descriptor has closed.');
});

archive.on('error', function(err){
  throw err;
});

archive.pipe(output);

archive.directory('dist/', false);

archive.finalize();