import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import api from "../api";

function Home() {
  const [userInfo, setUserInfo] = useState({ username: "", email: "" });
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);

  // TODO: Refresh the page when the page is loaded for the first time
  if (!localStorage.getItem("refreshed")) {
    localStorage.setItem("refreshed", "true");
    window.location.reload();
  }

  // TODO: Fetch user info and products
  useEffect(() => {
    if (localStorage.getItem("refreshed") === "true") {
      api
        .get("api/user/")
        .then((res) => setUserInfo(res.data))
        .catch((error) => alert(error));
      api
        .get("api/products/all/")
        .then((res) => setProducts(res.data))
        .catch((error) => alert(error));
    }
  }, []);

  // TODO: Filter products based on search query
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.id.toString().includes(searchQuery)
  );

  return (
    <div className="container">
      <div className="w-full bg-white rounded-lg shadow-md p-4 flex justify-between items-center">
        <h2 className="text-lg capitalize text-gray-600 ml-4">
          {userInfo.username}, Welcome Back!!
        </h2>
        <a
          href="/addProduct"
          className="bg-gray-500 text-white text-lg py-2 px-4 rounded hover:bg-gray-600 outline-none ease-in duration-100"
        >
          <FontAwesomeIcon
            icon={faPlus}
            style={{ marginRight: "10px", fontSize: "18px" }}
            aria-hidden="true"
          />
          Add Product
        </a>
      </div>
      <div className="min-w-full bg-white rounded-lg shadow-md p-6 mt-4 max-h-f text-gray-500">
        <div className="w-full flex justify-between items-center pt-2">
          <h2 className="text-2xl font-medium">View All Products</h2>
          <div className="relative">
            <input
              type="text"
              className="px-4 py-2 mt-2 border rounded-lg outline-none bg-slate-200 w-32 focus:w-40 ease-linear duration-150 text-black pr-10"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FontAwesomeIcon
              icon={faSearch}
              style={{
                fontSize: "18px",
                position: "absolute",
                top: "18px",
                right: "10px",
              }}
              aria-hidden="true"
            />
          </div>
        </div>
        <table className="mt-8 border-collapse table-auto rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-200 text-gray-600">
              <th className="px-4 py-2 border-b text-left font-medium">Id</th>
              <th
                className="px-4 py-2 border-b text-left font-medium"
                style={{ minWidth: "140px" }}
              >
                Name
              </th>
              <th
                className="px-4 py-2 border-b text-left font-medium"
                style={{ minWidth: "100px" }}
              >
                Price
              </th>
              <th className="px-4 py-2 border-b text-left font-medium">Qty</th>
              <th
                className="px-4 py-2 border-b text-left font-medium"
                style={{ minWidth: "240px" }}
              >
                Description
              </th>
              <th
                className="px-4 py-2 border-b text-left font-medium"
                style={{ minWidth: "120px" }}
              >
                Status
              </th>
            </tr>
          </thead>
          <tbody className="overflow-y-auto">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
                <tr
                  key={product.id}
                  className={`border-b-2 h-12 border-gray-200 ${
                    index === filteredProducts.length - 1 ? "border-none" : ""
                  }`}
                >
                  <td className="px-4 py-2 font-medium">{product.id}</td>
                  <td className="px-4 py-2">{product.name}</td>
                  <td className="px-4 py-2">{product.price}/=</td>
                  <td className="px-4 py-2">{product.amount}</td>
                  <td className="px-4 py-2">{product.description}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`inline-block px-3 py-1 text-sm font-semibold leading-tight rounded-full ${
                        product.is_active
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {product.is_active ? "Active" : "Discontinued"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-4 py-2 text-center">
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
