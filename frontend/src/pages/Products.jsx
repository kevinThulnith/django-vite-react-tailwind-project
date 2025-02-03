import { faPlus, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import api from "../api";

function Products() {
  const [products, setProducts] = useState([]);

  const fetchData = async () => {
    try {
      const resProducts = await api.get("api/products/", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access"),
        },
      });
      setProducts(resProducts.data);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="min-w-full bg-white rounded-lg shadow-md p-6 overflow-x-auto text-gray-500">
        <div className="min-w-full flex justify-between items-center mt-3">
          <h2 className="text-2xl font-medium">My Products</h2>
          <a
            href="/addProduct"
            className="bg-gray-500 text-white text-lg py-2 px-4 rounded inline-block text-center hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
          >
            <FontAwesomeIcon
              icon={faPlus}
              style={{ marginRight: "10px", fontSize: "18px" }}
              aria-hidden="true"
            />
            New Product
          </a>
        </div>
        <div className="mt-7 overflow-x-auto">
          <table className="border-collapse table-auto rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-200 text-gray-600">
                <th className=" px-4 py-2 border-b text-left font-medium">
                  Id
                </th>
                <th
                  className=" px-4 py-2 border-b text-left font-medium"
                  style={{ minWidth: "140px" }}
                >
                  Name
                </th>
                <th
                  className=" px-4 py-2 border-b text-left font-medium"
                  style={{ minWidth: "100px" }}
                >
                  Price
                </th>
                <th className=" px-4 py-2 border-b text-left font-medium">
                  Qty
                </th>
                <th
                  className=" px-4 py-2 border-b text-left font-medium"
                  style={{ minWidth: "240px" }}
                >
                  Description
                </th>
                <th
                  className=" px-4 py-2 border-b text-left font-medium"
                  style={{ minWidth: "100px" }}
                >
                  Ststus
                </th>
                <th
                  className=" px-4 py-2 border-b font-medium text-center"
                  style={{ minWidth: "120px" }}
                >
                  Edit
                </th>
                <th
                  className=" px-4 py-2 border-b text-center font-medium"
                  style={{ minWidth: "140px" }}
                >
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr
                  key={product.id}
                  className={`border-b-2 min-h-12 border-gray-300 ${
                    index === products.length - 1 ? "border-none" : ""
                  }`}
                >
                  <td className=" px-4 py-2 font-medium min-h-12">
                    {product.id}
                  </td>
                  <td className=" px-4 py-2">{product.name}</td>
                  <td className=" px-4 py-2">{product.price}/=</td>
                  <td className=" px-4 py-2">{product.ammount}</td>
                  <td className=" px-4 py-2">{product.description}</td>
                  <td className=" px-4 py-2">
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
                    {" "}
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Products;
