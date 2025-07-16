import axios from "axios";
import { useEffect, useState, type ReactElement } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoutes({
  children,
}: {
  children: ReactElement;
}) {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const checkAuth = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsLoggedIn(false);
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get("http://localhost:3000/api/v1/user/me", {
        headers: {
          Authentication: `Bearer ${token}`,
        },
      });
      setIsLoggedIn(res.data?.user?.id);
    } catch {
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    checkAuth();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!isLoggedIn) return <Navigate to="/login" replace />;
  return <>{children}</>;
}
