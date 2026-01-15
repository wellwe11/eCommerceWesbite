import Product from "../../components/ui/Product/product";

const Gallery = ({ data }) => {
  return (
    <div className="grid grid-cols-[repeat(3,clamp(100px,18vw,350px))] pt-30 justify-center justify-items-center w-full gap-x-10 gap-y-15">
      {data.map((obj, index) => (
        <Product key={`product_${index}`} data={obj} />
      ))}
    </div>
  );
};

export default Gallery;
