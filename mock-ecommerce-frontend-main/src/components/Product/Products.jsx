import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import HeroSection from "../HeroSection";

const Products = ({ apiData }) => {
  return (
    <div className=" mb-5 ">
      <HeroSection />
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
        <h2 className="text-5xl text-center font-semibold  tracking-wide mb-10">
          Products
        </h2>

        <div className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 ">
          {apiData
            ?.filter((item) => item && item.id)
            .map((items) => (
              <Link to={`/products/${items.id}`} key={items.id}>
                <ProductCard items={items} />
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
