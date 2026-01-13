import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "./Loader";

export default function ProtectedRoute() {
  const { loading, IsLogin, authChecked } = useSelector(
  (state) => state.auth
);

if (!authChecked || loading) return <Loader />;

if (!IsLogin) return <Navigate to="/login" replace />;

return <Outlet />;
}
