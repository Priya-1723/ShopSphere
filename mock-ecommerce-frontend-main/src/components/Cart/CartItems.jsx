import Button from "@mui/material/Button";
import { useState } from "react";
import { HiMinusSm } from "react-icons/hi";
import { HiPlus } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const CartItems = ({
  cartItem,
  setCartItem,
  removeProduct,
  qty,
  handleQtyMinus,
  handleQtyPlus,
}) => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const totalPrice = cartItem.reduce(
    (sum, item) => sum + Number(item.price) * (qty[item.id] || 1),
    0,
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Your Shopping Cart</h2>
      {cartItem.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cartItem.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between bg-white p-4 rounded shadow"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-contain"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">
                      {item.title.length > 32
                        ? `${item.title.slice(0, 32)}...`
                        : item.title}
                    </h3>
                    <p className="text-gray-700">
                      ${Number(item.price).toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-base">
                  <HiMinusSm onClick={() => handleQtyMinus(item.id)} />
                  <p>{qty[item.id]}</p>
                  <HiPlus onClick={() => handleQtyPlus(item.id)} />
                </div>
                <button
                  className="text-red-500 hover:underline"
                  onClick={() => removeProduct(item.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          {/* Total Section */}
          <div className="mt-6 border-t pt-4 text-right">
            <p className="text-lg font-semibold">
              Total:{" "}
              <span className="text-blue-600">${totalPrice.toFixed(2)}</span>
            </p>
          </div>
          <Button
            variant="contained"
            size="large"
            disabled={cartItem.length === 0}
            onClick={() => {
              setShowModal(true);
            }}
          >
            Checkout
          </Button>
        </>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-8 w-[90%] max-w-md text-center animate-fadeIn">
            <h2 className="text-2xl font-bold mb-4">
              🎉 Order Placed Successfully!
            </h2>

            <p className="text-gray-600 mb-6">
              Thank you for shopping with us.
            </p>

            <button
              onClick={() => {
                localStorage.removeItem("cart"); // clear localStorage
                setCartItem([]); // clear state
                setShowModal(false);
                navigate("/products"); // redirect to products
              }}
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded-md transition"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartItems;
