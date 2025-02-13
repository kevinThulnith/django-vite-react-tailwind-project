import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import api from "../api";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const logoutUser = async () => {
      const refreshToken = localStorage.getItem("refresh");

      if (!refreshToken) {
        console.error("No refresh token found");
        localStorage.clear();
        navigate("/login");
        return;
      }

      api
        .post("/api/token/blacklist/", { refresh: refreshToken })
        .catch((error) =>
          console.error("Logout failed:", error.response?.data || error.message)
        );

      localStorage.clear();
      navigate("/login");
    };

    logoutUser();
  }, [navigate]);

  return null;
}

export default Logout;
