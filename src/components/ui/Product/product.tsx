import type { ProductData, ProductImage } from "../../../app/App";

const Image = ({ data }: { data: ProductImage[] }) => {
  const mainImage = data.find((a: ProductImage) => a.type === "main")!.src;

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
