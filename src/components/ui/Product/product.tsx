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

const Details = ({ data }: { data: Omit<ProductData, "images"> }) => {
  const { name, price, width, height } = data;

  return (
    <div className="flex justify-between">
      <div>
        <p className="bio-text">{name}</p>
      </div>
      <div>
        <p className="bio-text text-right">{`${width} x ${height}`}</p>
        <p className="bio-text text-right">{price}</p>
      </div>
    </div>
  );
};

const Product = ({ data }: { data: ProductData }) => {
  const { images, ...details } = data;
  return (
    <div className="max-w-100">
      <Image data={images} />
      <Details data={details} />
    </div>
  );
};

export default Product;
