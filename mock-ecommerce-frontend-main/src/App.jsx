import { useEffect, useState } from "react";
import Products from "./components/Product/Products";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import CategoryProducts from "./components/Product/CategoryProducts";
import ProductDetails from "./components/Product/ProductDetails";
import CartItems from "./components/Cart/CartItems";
import Login from "./components/Pages/Login";
import ProtectedRoute from "./components/Authentication/ProtectedRoute";
import CreateProduct from "./components/Pages/CreateProduct";
import NewProducts from "./components/Pages/NewProducts";
import Footer from "./components/Footer";
import ThemeContext from "./contextAPi/ThemeContext";

function App() {
  const [apiData, setApiData] = useState([]);
  const [cartItem, setCartItem] = useState([]);
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // user = { email, role }

  const [newProducts, setNewProducts] = useState([]);
  const [productToEdit, setProductToEdit] = useState(null);
  const [theme, setTheme] = useState("light");
  const [qty, setQty] = useState(() =>
    Object.fromEntries(cartItem.map((item) => [item.id, 1])),
  );

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        let localProducts = [];

        try {
          const parsed = JSON.parse(localStorage.getItem("formData"));
          if (Array.isArray(parsed)) {
            localProducts = parsed.filter((item) => item && item.id);
          }
        } catch {
          localProducts = [];
        }

        setNewProducts(localProducts);
        setApiData([...data, ...localProducts]);
      })
      .catch((err) => console.error("Failed to fetch products:", err));
  }, []);

  const updateLocalProducts = (updatedList) => {
    const safeUpdated = updatedList.filter((item) => item && item.id);

    setNewProducts(safeUpdated);

    setApiData((prev) => {
      const safePrev = prev.filter((item) => item && item.id);

      const apiOnly = safePrev.filter(
        (p) => !safeUpdated.some((np) => np.id === p.id),
      );

      return [...apiOnly, ...safeUpdated];
    });

    localStorage.setItem("formData", JSON.stringify(safeUpdated));
  };

  const handleDeleteProduct = (id) => {
    const updatedProducts = newProducts.filter((product) => product.id !== id);
    setNewProducts(updatedProducts);
    localStorage.setItem("formData", JSON.stringify(updatedProducts));
    setApiData((prev) => {
      const apiOnly = prev.filter((p) => p.id !== id);
      return [...apiOnly, ...updatedProducts];
    });
  };

  const addToCart = (product) => {
    setCartItem((prev) => {
      const updatedCart = [...prev, product];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItem(JSON.parse(storedCart));
    }
  }, []);

  function handleRemoveCartProduct(id) {
    const cartUpdatedProducts = cartItem.filter((prev) => prev.id !== id);
    setCartItem(cartUpdatedProducts);
    localStorage.setItem("cart", JSON.stringify(cartUpdatedProducts));
  }

  function handleQtyMinus(id) {
    setQty((prev) => ({
      ...prev,
      [id]: Math.max(1, prev[id] - 1),
    }));
  }
  function handleQtyPlus(id) {
    setQty((prev) => ({
      ...prev,
      [id]: Math.max(1, prev[id] + 1),
    }));
  }

  useEffect(() => {
    setQty((prevQty) => {
      const newQty = { ...prevQty };
      cartItem.forEach((item) => {
        if (!(item.id in newQty)) {
          newQty[item.id] = 1;
        }
      });
      return newQty;
    });
  }, [cartItem]);

  const handleLogin = (email, password) => {
    if (email === "admin@gmail.com" && password === "1234") {
      const adminUser = { email, role: "admin" };
      localStorage.setItem("user", JSON.stringify(adminUser));
      setUser(adminUser);
      navigate("/products");
    } else if (email === "user@gmail.com" && password === "1234") {
      const normalUser = { email, role: "user" };
      localStorage.setItem("user", JSON.stringify(normalUser));
      setUser(normalUser);
      navigate("/products");
    } else {
      alert("Invalid Credentials");
    }
  };

  function handleNewCreatedProduct(newData) {
    let stored = [];
    try {
      const raw = localStorage.getItem("formData");
      if (raw) {
        const parsed = JSON.parse(raw);
        // If parsed is an array, assign directly, else wrap it in an array
        stored = Array.isArray(parsed) ? parsed : [parsed];
      }
    } catch {
      stored = [];
    }
    localStorage.setItem("formData", JSON.stringify([...stored, newData]));
    setApiData((prev) => [...prev, newData]);
  }

  return (
    <div className={theme === "dark" ? "dark" : "light"}>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <div className=" dark:bg-black dark:text-white min-h-screen">
          <ResponsiveAppBar user={user} setUser={setUser} />
          <Routes>
            <Route
              path="/login"
              element={
                user ? (
                  <Navigate to="/products" />
                ) : (
                  <Login setLogin={handleLogin} />
                )
              }
            />

            <Route path="/products" element={<Products apiData={apiData} />} />

            <Route
              path="/products/:id"
              element={
                <ProductDetails apiData={apiData} addToCart={addToCart} />
              }
            />
            <Route
              path="/category/:categoryName"
              element={<CategoryProducts apiData={apiData} />}
            />
            <Route
              path="/cart"
              element={
                <ProtectedRoute user={user}>
                  <CartItems
                    cartItem={cartItem}
                    setCartItem={setCartItem}
                    removeProduct={handleRemoveCartProduct}
                    qty={qty}
                    handleQtyMinus={handleQtyMinus}
                    handleQtyPlus={handleQtyPlus}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/createproduct"
              element={
                <ProtectedRoute user={user} role="admin">
                  <CreateProduct
                    handleNewCreatedProduct={handleNewCreatedProduct}
                    setProductToEdit={setProductToEdit}
                    productToEdit={productToEdit}
                    updateLocalProducts={updateLocalProducts}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/newproducts"
              element={
                <ProtectedRoute user={user} role="admin">
                  <NewProducts
                    newProducts={newProducts}
                    setProductToEdit={setProductToEdit}
                    onDeleteProduct={handleDeleteProduct}
                  />
                </ProtectedRoute>
              }
            />
            {/* Redirect all unknown routes to /login */}
            <Route path="*" element={<Navigate to="/products" />} />
          </Routes>
          <Footer />
        </div>
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
