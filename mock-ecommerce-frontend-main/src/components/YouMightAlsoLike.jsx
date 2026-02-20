import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const YouMightAlsoLike = ({ items }) => {
  let displayProducts = 5;
  const [scroll, setScroll] = useState(0);

  const handleRight = () => {
    if (scroll + displayProducts < items.length) {
      setScroll((prev) => prev + 1);
    }
  };
  const handleLeft = () => {
    if (scroll > 0) {
      setScroll((prev) => prev - 1);
    }
  };
  // console.log(scroll, scroll + displayProducts);

  const visibleItems = items.slice(scroll, scroll + displayProducts);

  return (
    <div className="relative">
      <button
        onClick={handleLeft}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md"
      >
        <FaChevronLeft />
      </button>

      <div className="overflow-hidden">
        <ul className="flex transition-transform duration-500 ease-in-out">
          {visibleItems.map((item, index) => (
            <li key={index} className="w-[240px] flex-shrink-0 px-2">
              <Link to={`/products/${item.id}`}>
                <div className="flex flex-col items-center bg-white p-4 rounded-md shadow-sm">
                  <div className="w-full h-48 flex items-center justify-center ">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <div className="mt-4 w-full text-center">
                    <p className="text-sm font-normal text-gray-900 truncate">
                      {item.title.length > 21
                        ? `${item.title.slice(0, 21)}...`
                        : item.title}
                    </p>
                    <p className="text-sm font-semibold text-gray-900">
                      ${item.price}
                    </p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={handleRight}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md"
      >
        <FaChevronRight />
      </button>
    </div>
  );
};

export default YouMightAlsoLike;
