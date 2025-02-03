import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import api from "../api";

function Home() {
  const [userInfo, setUserInfo] = useState({ username: "", email: "" });
  const [products, setProducts] = useState([]);

  if (!localStorage.getItem("refreshed")) {
    localStorage.setItem("refreshed", "true");
    window.location.reload();
  }

  const fetchData = async () => {
    try {
      const res = await api.get("api/user/", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access"),
        },
      });
      setUserInfo(res.data);
      const resProducts = await api.get("api/products/all/", {
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
      <div className="w-full bg-white rounded-lg shadow-md p-6 flex justify-between items-center">
        <h2 className="text-lg capitalize text-gray-600">
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
      <div className="min-w-full bg-white rounded-lg shadow-md p-6 mt-4 overflow-x-auto text-gray-500">
        <h2 className="text-2xl mb-4 font-medium">View All products</h2>
        <table className="mt-3 border-collapse table-auto rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-200 text-gray-600">
              <th className=" px-4 py-2 border-b text-left font-medium">Id</th>
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
              <th className=" px-4 py-2 border-b text-left font-medium">Qty</th>
              <th
                className=" px-4 py-2 border-b text-left font-medium"
                style={{ minWidth: "240px" }}
              >
                Description
              </th>
              <th
                className=" px-4 py-2 border-b text-left font-medium"
                style={{ minWidth: "120px" }}
              >
                Ststus
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr
                key={product.id}
                className={`border-b-2 h-9 border-gray-300 ${
                  index === products.length - 1 ? "border-none" : ""
                }`}
              >
                <td className=" px-4 py-2 font-medium">{product.id}</td>
                <td className=" px-4 py-2">{product.name}</td>
                <td className=" px-4 py-2">{product.price}/=</td>
                <td className=" px-4 py-2">{product.ammount}</td>
                <td className=" px-4 py-2">{product.description}</td>
                <td className=" px-4 py-2">
                  {product.is_active ? "Active" : "Discontinued"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
