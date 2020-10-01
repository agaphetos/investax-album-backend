const fs = require('fs');
const path = require('path');

const Photos = require('../models/Photos');

const albumsPath = path.join(process.cwd(), 'albums');
const albums = fs.readdirSync(albumsPath);

const insertOperations = albums.map((album) => {
  const albumPath = `${albumsPath}/${album}`;

  if (fs.existsSync(albumPath) && fs.lstatSync(albumPath).isDirectory()) {
    const files = fs.readdirSync(albumPath);

    const photos = files.map((file) => ({
      album: album.charAt(0).toUpperCase() + album.slice(1),
      name: file,
      path: `/albums/${album}/${file}`,
    }));

    return Photos.insertMany(photos);
  }
  return null;
});

Promise.all(insertOperations)
  .then((result) => {
    result.forEach((item) => { console.log(item); });
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
  });
