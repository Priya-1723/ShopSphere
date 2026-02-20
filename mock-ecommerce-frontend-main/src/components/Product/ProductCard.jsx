import Rating from "@mui/material/Rating";

const ProductCard = ({ items }) => {
  return (
    <div className="border border-gray-300 p-4 rounded shadow hover:shadow-lg transition flex flex-col h-full">
      <div className="group">
        <div className="w-full aspect-square overflow-hidden rounded-lg">
          <img
            src={items.image}
            alt={items.title}
            className="h-full w-full object-contain group-hover:scale-105 transition"
          />
        </div>

        <h3 className="mt-4 text-base font-semibold text-gray-700">
          {items.title.length > 21
            ? `${items.title.slice(0, 21)}...`
            : items.title}
        </h3>

        <div className="flex items-center justify-between">
          <p className="mt-1 text-lg font-medium text-gray-900">
            ${items.price}
          </p>

          <Rating name="read-only" value={items?.rating?.rate || 0} readOnly />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
