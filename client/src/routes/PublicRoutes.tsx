import { Routes, Route } from "react-router-dom";
import PublicLayout from "../layout/PublicLayout";
import Home from "../pages/Home";
import ProductDetails from "../pages/ProductDetails";
import Login from "../pages/Login";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
};

export default PublicRoutes;
