export const transformImageUrl = href =>
  // TODO : Check For WebP Support
  `https://images.weserv.nl/?url=${href}&output=webp`;
