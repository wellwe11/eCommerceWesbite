import type { ProductData, ProductImage } from "../../../app/App";

const Image = ({ data }: { data: ProductImage[] }) => {
  const mappedImages = new Map();
  data.forEach((d) => {
    if (mappedImages.has(d.type)) {
      mappedImages.get(d.type).push(d);
    } else {
      mappedImages.set(d.type, [d]);
    }
  });

  const mainImage = mappedImages.get("main")[0].src;

  return <img src={mainImage} />;
};

const Details = ({ data }: { data: Omit<ProductData, "images"> }) => {};

const Product = ({ data }: { data: ProductData }) => {
  const { images, ...details } = data;
  return (
    <div>
      <h1>hello</h1>
      <Image data={images} />
      <Details data={details} />
    </div>
  );
};

export default Product;
