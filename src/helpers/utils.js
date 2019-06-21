import supportsWebP from "supports-webp";

let webpIsSupported = null;
const checkWebpSupport = async () => {
  if (webpIsSupported === null) {
    if (await supportsWebP) webpIsSupported = true;
    else webpIsSupported = false;
  }
};

// https://images.weserv.nl
export const transformImageUrl = async (href, size) => {
  await checkWebpSupport();

  return `https://images.weserv.nl/?url=${href}${
    size ? `&w=${size}&h=${size}` : ``
  }${webpIsSupported ? `&output=webp` : `&il`}`;
};
