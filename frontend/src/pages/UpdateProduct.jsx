import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoadingIndicator from "../components/LoadingIndicator";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../api";

function UpdateProduct() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    ammount: "",
    is_active: true,
  });

  // TODO: Fetch product data
  useEffect(() => {
    api
      .get(`api/products/${id}/`)
      .then((res) => setProduct(res.data))
      .catch((error) => alert(error));
  }, [id]);

  // TODO: Handle form submission
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: type === "radio" ? value === "true" : value,
    }));
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    api
      .put(`api/products/update/${id}/`, product)
      .then(() => {
        alert("Product updated successfully");
        navigate("/products");
      })
      .catch((error) => alert(error))
      .finally(() => setLoading(false));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 md:w-[700px] sm:w-[500px] w-[370px] mx-auto form-container">
      <h2 className="text-3xl font-semibold text-gray-500 p-3">
        Update Product
        <FontAwesomeIcon
          icon={faPencil}
          style={{ marginLeft: "10px" }}
          aria-hidden="true"
        />
      </h2>
      <span className="text-sm text-gray-600 px-3">
        make changes and submit
      </span>
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
            name="name"
            value={product.name}
            onChange={handleChange}
            placeholder="Enter product name"
            className="inpt mt-3 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
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
            name="price"
            value={product.price}
            onChange={handleChange}
            pattern="[0-9]+(\.[0-9][0-9]?)?"
            placeholder="Enter product price"
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
            name="ammount"
            pattern="[0-9]+"
            value={product.ammount}
            onChange={handleChange}
            placeholder="Enter product quantity"
            title="Enter numbers only (e.g., 123)"
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
            name="description"
            onChange={handleChange}
            value={product.description}
            className="resize-none mt-3 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
            placeholder="Enter product description"
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Status
          </label>
          <div className="mt-1">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="is_active"
                value="true"
                checked={product.is_active === true}
                onChange={handleChange}
                className="form-radio"
              />
              <span className="ml-2">Active</span>
            </label>
            <label className="inline-flex items-center ml-6">
              <input
                type="radio"
                name="is_active"
                value="false"
                checked={product.is_active === false}
                onChange={handleChange}
                className="form-radio"
              />
              <span className="ml-2">Discontinued</span>
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="font-medium mt-2 px-4 py-2 text-slate-100 bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
        >
          Update
        </button>
      </form>
      {loading && <LoadingIndicator />}
    </div>
  );
}

export default UpdateProduct;
