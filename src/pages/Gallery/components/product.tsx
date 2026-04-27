import type { ProductData } from "@/types/product";

const Details = ({ data }: { data: Omit<ProductData, "images"> }) => {
  const { name, price, width, height } = data;

  return (
    <div className="flex justify-between">
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
      className="flex flex-col justify-center cursor-pointer hover:bg-gray-200/50 transition-colors duration-400 ease w-full h-75"
    >
      <img src={src} className="w-full h-[90%] object-cover block" alt="" />
      <Details data={details} />
    </div>
  );
};

export default Product;
