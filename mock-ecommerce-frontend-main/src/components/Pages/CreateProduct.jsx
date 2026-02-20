import { useEffect, useState } from "react";

const CreateProduct = ({
  handleNewCreatedProduct,
  setProductToEdit,
  productToEdit,
  updateLocalProducts,
}) => {
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    description: "",
    image: "",
    price: "",
    category: "",
  });

  useEffect(() => {
    if (productToEdit) {
      setFormData(productToEdit);
    }
  }, [productToEdit]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const existing = localStorage.getItem("formData");
    const newProduct = {
      ...formData,
      id: Date.now(),
      price: Number(formData.price),
    };
    let stored = [];
    if (existing) {
      try {
        const parsed = JSON.parse(existing);
        stored = Array.isArray(parsed) ? parsed : [];
      } catch {
        stored = [];
      }
    }
    let updateProducts;
    if (productToEdit) {
      updateProducts = stored.map((item) =>
        item.id === productToEdit.id ? formData : item,
      );
      updateLocalProducts(updateProducts);
      setProductToEdit(null);
    } else {
      updateProducts = [...stored, newProduct];
      handleNewCreatedProduct(newProduct);
      updateLocalProducts(updateProducts);
    }

    localStorage.setItem("formData", JSON.stringify(updateProducts));
    setFormData({
      id: "",
      title: "",
      description: "",
      image: "",
      price: "",
      category: "",
    });
    alert("Data saved to local storage!");
  }

  return (
    <div className="mt-10 mb-10 flex flex-col items-center justify-center">
      <div>
        <h1 className="font-bold text-2xl">Create Product</h1>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm/6 font-medium text-gray-900">
              Id
            </label>
            <input
              type="text"
              name="id"
              value={formData.id}
              onChange={handleChange}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
          <div>
            <label className="block text-sm/6 font-medium text-gray-900">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
          <div>
            <label className="block text-sm/6 font-medium text-gray-900">
              Description
            </label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
          <div>
            <label className="block text-sm/6 font-medium text-gray-900">
              Image
            </label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
          <div>
            <label className="block text-sm/6 font-medium text-gray-900">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
          <div>
            <label
              htmlFor=""
              className="block text-sm/6 font-medium text-gray-900"
            >
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            >
              <option value="">Choose a Category</option>
              <option value="jewelery">Jewelery</option>
              <option value="men's clothing">Men's Clothing</option>
              <option value="women's clothing">Women's Clothing</option>
              <option value="electronics">Electronics</option>
            </select>
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {productToEdit ? "Save" : "Create Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
