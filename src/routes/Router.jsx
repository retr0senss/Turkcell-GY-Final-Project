import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "../Views/Home/Home";
import Cart from "../Views/Cart/Cart";
import ProductDetail from "../Views/ProductDetail/ProductDetail";
import Products from "../Views/Products/Products";
import SignUp from "../views/Signup/Signup";
import Login from "../views/Login/Login";
import PrivateRoutes from "./PrivateRoutes";
import AuthRoutes from "./AuthRoutes";

const Router = () => {
  const user = useSelector((state) => state.user.user);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route element={<PrivateRoutes user={user} />}>
        <Route path="/cart" element={<Cart />} />
        <Route path="/product-detail/:id" element={<ProductDetail />} />
        <Route path="/products" element={<Products />} />
      </Route>
      <Route element={<AuthRoutes user={user} />}>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
};

export default Router;
