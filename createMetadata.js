const basePath = process.cwd();
const fs = require("fs");

const metadataList = [];

const PROJECT_CONFIG = {
    namePrefix: "MyNFT",
    description: "NFT description",
    iconUri: "ipfs://bafy.../",
    imageUri: "ipfs://bafy.../"
}

const buildJson = (index, _iconmedia, _imagemedia) => {

    let iconUri = PROJECT_CONFIG.iconUri;
    const iconUriCheck = iconUri.charAt(iconUri.length - 1);
    iconUri = iconUriCheck === '/' ? iconUri : `${iconUri}/`;
    const iconmedia = _iconmedia ? `${iconUri}${_iconmedia}` : `${iconUri}${index + 1}.png`;
    
    let imageUri = PROJECT_CONFIG.imageUri;
    const imageUriCheck = imageUri.charAt(imageUri.length - 1);
    imageUri = imageUriCheck === '/' ? imageUri : `${imageUri}/`;
    const imagemedia = _imagemedia ? `${imageUri}${_imagemedia}` : `${imageUri}${index + 1}.png`;

    const tempData = {
        "name": `${PROJECT_CONFIG.namePrefix} #${index + 1}`,
        "description": `${PROJECT_CONFIG.description}`,
        "image": `${iconmedia}`,
        "fullimage": `${imagemedia}`,
        "attributes": [
            {
                "trait_type": "NFT serial number", // do not remove
                "value": `${index + 1}` // do not remove
            },
            {
                "trait_type": "...",
                "value": "..."
            },
            {
                "trait_type": "...",
                "value": "..."
            },
        ]
    }

    const payload = { ...tempData };
    metadataList.push(payload);
}

const saveAllJson = () => {
    fs.writeFileSync(
        `${basePath}/metaAll/metadata.json`,
        JSON.stringify(metadataList, null, 2)
    );
}

const generate = async () => {
    let nfts = 100; // change total amount of NFTs metadata
    console.log(`Generated ${nfts} NFTs metadata`);
    for (let i = 0; i < nfts; i++) {
        buildJson(i);
        saveAllJson();
    }
}

const saveJson = (payload) => {
    let filename = `${payload.attributes[0].value}.json`;
    fs.writeFileSync(
        `${basePath}/metaSplit/` + filename,
        JSON.stringify(payload, null, 2)
    );
}

const generateFromMetadataJson = async () => {
    const metadataJson = `${basePath}/metaAll/metadata.json`;
    console.log(`Reading ${metadataJson}`);
    let rawdata = fs.readFileSync(metadataJson);
    let data = JSON.parse(rawdata);
    if (data && data.length > 0) {
        data.forEach((element) => {
            console.log(`Exporting to ${element.attributes[0].value}.json`);
            saveJson(element);
        });
    }
}

module.exports = { generate, generateFromMetadataJson };