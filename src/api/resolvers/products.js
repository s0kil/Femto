import { Moltin } from "../services/moltin";

// Get All Products
export default async () => {
  const { data, included } = await Moltin.Products.With("main_image").All();

  return data.map(product => {
    const imageId = product.relationships.main_image
      ? product.relationships.main_image.data.id
      : false;

    return {
      ...product,
      main_image: {
        href: imageId
          ? included.main_images.find(image => image.id === imageId).link.href
          : "/static/no-image.png"
      }
    };
  });
};
