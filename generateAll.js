const basePath = process.cwd();
const { generate } = require(`${basePath}/createMetadata.js`);

(() => { generate() } )
();