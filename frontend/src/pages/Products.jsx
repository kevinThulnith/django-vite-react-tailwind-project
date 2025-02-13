import { faSearch, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import api from "../api";

function Products() {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);

  // TODO: Fetch products
  useEffect(() => {
    api
      .get("api/products/")
      .then((res) => setProducts(res.data))
      .catch((error) => alert(error));
  }, []);

  // !Filter products based on search query
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.id.toString().includes(searchQuery)
  );

  return (
    <div className="container">
      <div className="min-w-full bg-white rounded-lg shadow-md p-6 overflow-x-auto text-gray-500">
        <div className="min-w-full flex justify-between items-center mt-3">
          <h2 className="text-2xl font-medium">My Products</h2>
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
        <div className="mt-7 overflow-x-auto">
          <table className="border-collapse table-auto rounded-lg overflow-hidden">
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
                <th className="px-4 py-2 border-b text-left font-medium">
                  Qty
                </th>
                <th
                  className="px-4 py-2 border-b text-left font-medium"
                  style={{ minWidth: "240px" }}
                >
                  Description
                </th>
                <th
                  className="px-4 py-2 border-b text-left font-medium"
                  style={{ minWidth: "100px" }}
                >
                  Status
                </th>
                <th
                  className="px-4 py-2 border-b font-medium text-center"
                  style={{ minWidth: "120px" }}
                >
                  Edit
                </th>
                <th
                  className="px-4 py-2 border-b text-center font-medium"
                  style={{ minWidth: "140px" }}
                >
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product, index) => (
                  <tr
                    key={product.id}
                    className={`border-b-2 min-h-12 border-gray-300 ${
                      index === filteredProducts.length - 1 ? "border-none" : ""
                    }`}
                  >
                    <td className="px-4 py-2 font-medium min-h-12">
                      {product.id}
                    </td>
                    <td className="px-4 py-2">{product.name}</td>
                    <td className="px-4 py-2">{product.price}/=</td>
                    <td className="px-4 py-2">{product.ammount}</td>
                    <td className="px-4 py-2">{product.description}</td>
                    <td className="px-4 py-2">
                      {product.is_active ? "Active" : "Discontinued"}
                    </td>
                    <td className="text-center">
                      <a
                        href={`/update/${product.id}`}
                        className="bg-orange-500 text-white py-1 px-4 rounded font-medium hover:bg-blue-700 focus:outline-none focus:ring-0 focus:opacity-50"
                      >
                        Edit
                        <FontAwesomeIcon
                          icon={faPencil}
                          style={{ marginLeft: "10px", fontSize: "18px" }}
                          aria-hidden="true"
                        />
                      </a>
                    </td>
                    <td className="text-center">
                      <a
                        href={`/delete/${product.id}`}
                        className="bg-red-500 text-white py-1 px-4 rounded font-medium hover:bg-blue-700 focus:outline-none focus:ring-0 focus:opacity-50"
                      >
                        Delete
                        <FontAwesomeIcon
                          icon={faTrash}
                          style={{ marginLeft: "10px", fontSize: "18px" }}
                          aria-hidden="true"
                        />
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="px-4 py-2 text-center">
                    No records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Products;
