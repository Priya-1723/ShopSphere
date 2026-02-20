import { useNavigate, useParams } from "react-router-dom";
import Button from "@mui/material/Button";

const ProductDetails = ({ apiData, addToCart }) => {
  const { id } = useParams();
  console.log("id", id);

  const product = apiData.find((item) => {
    return String(item.id) == Number(id);
  });
  console.log("product", product);
  const navigate = useNavigate();
  console.log("apidata in details", apiData);

  return (
    <div className="mx-auto max-w-6xl mt-10 py-10 px-4 sm:px-6 lg:px-8">
      {product ? (
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-y-10 lg:gap-x-10">
          <img
            src={product.image}
            alt={product.title}
            className="w-48 sm:w-64 md:w-72 lg:w-60 object-contain"
          />
          <div className="flex flex-col gap-y-6 text-center lg:text-left max-w-xl">
            <h2 className="font-bold text-lg sm:text-xl md:text-2xl">
              {product.title}
            </h2>
            <p className="text-sm sm:text-base text-gray-700">
              {product.description}
            </p>
            <p className="font-semibold text-xl text-gray-900">
              ${product.price}
            </p>
            <Button
              variant="contained"
              size="large"
              onClick={() => {
                addToCart(product);
                navigate("/cart");
              }}
              className="self-center lg:self-start"
            >
              Add To Cart
            </Button>
          </div>
        </div>
      ) : (
        <p className="text-center text-red-500 font-semibold">No Data Found</p>
      )}
    </div>
  );
};

export default ProductDetails;
