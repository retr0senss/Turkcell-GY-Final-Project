import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "../../redux/slices/userSlice";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");

  const handleSearch = (event) => {
    if (event.key === "Enter") {
      if (query === "") {
        return;
      }
      navigate(`/products?query=${query}`);
      setQuery("");
    }
  };

  return (
    <div className=" position-absolute w-100 top-0">
      <nav className="navbar container navbar-expand-lg mt-3 px-5">
        <div className="container-fluid  ">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <a className="navbar-brand m-0" href="/">
            <img src="/logo.png" alt="" />
          </a>
          <img
            src="/icons/Vector.svg"
            alt="Search Icon Vector"
            className="img-fluid d-block d-lg-none"
          />
          <div
            className="collapse navbar-collapse ms-5"
            id="navbarNavAltMarkup"
          >
            <ul className="navbar-nav ">
              <li
                className="nav-item nav-link text-primary fw-bold fs-6 me-4"
                onClick={() => navigate("/")}
              >
                Home
              </li>
              <li
                className="nav-item nav-link text-primary fw-bold fs-6 me-4"
                onClick={() => navigate("/products")}
              >
                Category
              </li>
              <li className="nav-item nav-link text-primary fw-bold fs-6 me-4 ">
                About
              </li>
              <li className="nav-item nav-link text-primary fw-bold fs-6">
                Contact
              </li>
            </ul>
          </div>
          <div className="d-none d-lg-block">
            <img
              src="/icons/input-search.svg"
              alt="Search Icon"
              className="img-fluid"
            />
            <input
              type="text"
              placeholder="Search something here!"
              className="me-3 border-0 bg-transparent"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleSearch}
            />
            {!user && (
              <>
                <Button
                  text="Login"
                  onClick={() => navigate("/login")}
                  bgColor="primary"
                />

                <Button
                  text="SignUp"
                  onClick={() => navigate("/signup")}
                  bgColor="primary"
                />
              </>
            )}
            {user && (
              <>
                <Button
                  text="Logout"
                  onClick={() => {
                    dispatch(clearUser());
                    navigate("/login");
                  }}
                  bgColor="primary"
                />
                <Button
                  text={
                    <img
                      src="/icons/Shopping_Cart_01.png"
                      alt="Shopping Cart Icon"
                      className="img-fluid"
                    />
                  }
                  onClick={() => navigate("/cart")}
                  bgColor="primary"
                />
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
