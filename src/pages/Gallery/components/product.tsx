import type { ProductData } from "@/types/product";

const Details = ({ data }: { data: Omit<ProductData, "images"> }) => {
  const { name, price, width, height } = data;

  return (
    <div className="flex justify-between py-1">
      <div>
        <p className="bio-text">{name}</p>
      </div>
      <div>
        <p className="bio-text text-right">{`${width} x ${height} cm`}</p>
        <p className="bio-text text-right">{price} €</p>
      </div>
    </div>
  );
};

const Product = ({ data, handler }: { data: ProductData }) => {
  const { src, name, price, year, width, height } = data;
  const details = { name, price, year, width, height };

  return (
    <div
      onClick={handler}
      className="max-w-100 cursor-pointer hover:bg-gray-200/50 transition-colors duration-400 ease"
    >
      <img src={src} />
      <Details data={details} />
    </div>
  );
};

export default Product;
