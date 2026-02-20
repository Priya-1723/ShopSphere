import { Link, useParams } from "react-router-dom";
import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";
import YouMightAlsoLike from "../YouMightAlsoLike";

const CategoryProducts = ({ apiData }) => {
  const { categoryName } = useParams();
  const [sorted, setSorted] = useState("default");
  const [randomProducts, setRandomProducts] = useState([]);

  const filteredProducts = apiData.filter(
    (item) => item.category.toLowerCase() === categoryName.toLowerCase(),
  );
  if (sorted === "lowToHigh") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sorted === "highToLow") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  useEffect(() => {
    const shuffled = [...apiData].sort(() => 0.5 - Math.random());
    // console.log("shuffled", 0.5 - Math.random());

    setRandomProducts(shuffled.slice(0, 8));
  }, [categoryName]);

  useEffect(() => {
    setSorted("default");
  }, [categoryName]);

  return (
    <>
      <div className=" flex flex-col mt-15">
        <div className="border-b border-gray-300  ">
          <div className="group inline-flex justify-center pl-20 text-xl font-medium text-gray-700 hover:text-gray-900">
            <label htmlFor="sort" className="text-lg font-medium">
              Sort:
            </label>
            <select
              id="sort"
              value={sorted}
              onChange={(e) => setSorted(e.target.value)}
              className="text-base"
            >
              <option value="default">Default</option>
              <option value="lowToHigh">Price: Low To High</option>
              <option value="highToLow">Price: High To Low</option>
            </select>
          </div>
        </div>
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Products</h2>

          <div className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 ">
            {filteredProducts.map((items) => (
              <Link to={`/products/${items.id}`} key={items.id}>
                <ProductCard items={items} />
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-6xl mb-10">
        <h2 className="text-3xl text-center font-semibold mb-8">
          You might also like
        </h2>
        <YouMightAlsoLike items={randomProducts} />
      </div>
    </>
  );
};

export default CategoryProducts;
