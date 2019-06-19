export const transformImageUrl = (href, size) =>
  // TODO : Check For WebP Support
  `https://images.weserv.nl/?url=${href}${
    size ? `&w=${size}&h=${size}` : ``
  }&output=webp&il`;
