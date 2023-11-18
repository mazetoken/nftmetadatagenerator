const basePath = process.cwd();
const { generateFromMetadataJson } = require(`${basePath}/createMetadata.js`);

(() => { generateFromMetadataJson() })
();