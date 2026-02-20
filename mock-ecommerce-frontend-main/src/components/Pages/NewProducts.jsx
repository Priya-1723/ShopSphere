import { Link, useNavigate } from "react-router-dom";

const NewProducts = ({ newProducts, setProductToEdit, onDeleteProduct }) => {
  const navigate = useNavigate();

  const handleEdit = (product) => {
    setProductToEdit(product);
    navigate("/createProduct");
  };
  const handleDelete = (id) => {
    onDeleteProduct(id);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">New Products</h2>
      {newProducts.length === 0 ? (
        <p className="text-gray-500">You haven't created any new product.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {newProducts.map((product, index) => (
              <li
                key={index}
                className="flex items-center justify-between bg-white p-4 rounded shadow"
              >
                <div className="flex items-center gap-6">
                  <Link
                    to={`/products/${product.id}`}
                    className="flex items-center gap-4 hover:underline"
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-16 h-16 object-contain"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {product.title}
                      </h3>
                      <p className="text-gray-700">${product.price}</p>
                    </div>
                  </Link>
                </div>

                <div className="space-x-6">
                  <button
                    className="text-lg text-green-500 hover:text-green-800"
                    onClick={() => handleEdit(product)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-lg text-red-500 hover:text-red-800"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default NewProducts;
