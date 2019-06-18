import { Moltin } from "../services/moltin";

// Get Product By `id`
export default async ({ id }) => {
  const { data, included } = await Moltin.Products.With("main_image").Get(id);
  const imageId = data.relationships.main_image
    ? data.relationships.main_image.data.id
    : false;

  return {
    ...data,
    main_image: {
      href: imageId
        ? included.main_images.find(image => image.id === imageId).link.href
        : "/static/no-image.png"
    }
  };
};
