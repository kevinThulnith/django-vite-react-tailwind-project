import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import DeleteProduct from "./pages/DeleteProduct";
import UpdateProduct from "./pages/UpdateProduct";
import AddProduct from "./pages/AddProduct";
import Navbar from "./components/Navbar";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import Products from "./pages/Products";
import Login from "./pages/Login";
import Home from "./pages/Home";
import React from "react";

// TODO: Hnadling logout
function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

// TODO: Register and logout
function RegisterAndLogout() {
  localStorage.clear();
  return <Register />;
}

// !App component
function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  React.useEffect(() => {
    const accessToken = localStorage.getItem("access");
    setIsAuthenticated(!!accessToken); // !Set true if accessToken exists
  }, []);

  return (
    <BrowserRouter>
      {isAuthenticated && <Navbar />}
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
        />
        <Route
          path="/addProduct"
          element={
            <ProtectedRoute>
              <AddProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/update/:id"
          element={
            <ProtectedRoute>
              <UpdateProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/delete/:id"
          element={
            <ProtectedRoute>
              <DeleteProduct />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
