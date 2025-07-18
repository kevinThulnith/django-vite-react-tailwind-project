import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoadingIndicator from "../components/LoadingIndicator";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../api";

function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [amount, setQty] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    api
      .post("api/products/", { name, price, description, amount })
      .then(() => {
        alert("Product added successfully!");
        navigate("/products");
      })
      .catch((error) => alert(error))
      .finally(() => setLoading(false));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 md:w-[700px] sm:w-[500px] w-[370px] mx-auto form-container">
      <h2 className="text-3xl font-semibold text-gray-500 p-3">
        <FontAwesomeIcon
          icon={faPlus}
          style={{ marginRight: "10px" }}
          aria-hidden="true"
        />
        Add New Product
      </h2>
      <span className="text-sm text-gray-600">fill the form and submit</span>
      <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-600"
          >
            Product Name
          </label>
          <input
            required
            id="name"
            type="text"
            value={name}
            placeholder="Enter product name"
            onChange={(e) => setName(e.target.value)}
            className="mt-3 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
          />
        </div>
        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-600"
          >
            Price
          </label>
          <input
            required
            id="price"
            type="text"
            value={price}
            pattern="[0-9]+(\.[0-9][0-9]?)?"
            placeholder="Enter product price"
            onChange={(e) => setPrice(e.target.value)}
            title="Enter numbers only (e.g., 123 or 123.45)"
            className="mt-3 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
          />
        </div>
        <div>
          <label
            htmlFor="qty"
            className="block text-sm font-medium text-gray-600"
          >
            Quantity
          </label>
          <input
            required
            id="qty"
            type="text"
            value={amount}
            pattern="[0-9]+"
            placeholder="Enter product quantity"
            title="Enter numbers only (e.g., 123)"
            onChange={(e) => setQty(e.target.value)}
            className="mt-3 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-600"
          >
            Description
          </label>
          <textarea
            required
            rows="3"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="resize-none mt-3 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
            placeholder="Enter product description"
          ></textarea>
        </div>
        <button
          type="submit"
          className="font-medium mt-2 px-4 py-2 text-slate-100 bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
        >
          Submit
        </button>
      </form>
      {loading && <LoadingIndicator />}
    </div>
  );
}

export default AddProduct;
