import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CartCard = ({ product, handleRemove, handleQuantity }) => {
  const [quantity, setQuantity] = useState(product.quantity);
  const navigate = useNavigate();
  return (
    <div className="row">
      <div className="col-12">
        <div className="row">
          <div className="col-12 col-lg-2">
            <img
              src={product.image}
              alt="Product"
              className="img-fluid rounded"
              onClick={() => navigate(`/product-detail/${product.id}`)}
            />
          </div>
          <div className="col-12 col-lg-10 d-flex align-items-center ">
            <div className="row justify-content-between w-100">
              <div className="col-12 col-lg-6">
                <h3 onClick={() => navigate(`/product-detail/${product.id}`)}>
                  {product.title}
                </h3>
                <p>Price: ${product.price}</p>
              </div>
              <div className="col-12 col-lg-6 ">
                <div className="row ">
                  <div className="col-12 col-lg-6 d-flex gx-5">
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        if (quantity === 1) handleRemove(product.id);
                        setQuantity(quantity - 1);
                        handleQuantity(product.id, quantity - 1);
                      }}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      className="form-control mx-3 w-100 text-center"
                      value={quantity}
                      onChange={(e) => {
                        setQuantity(parseInt(e.target.value));
                        handleQuantity(product.id, parseInt(e.target.value));
                      }}
                    />
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        setQuantity(quantity + 1);
                        handleQuantity(product.id, quantity + 1);
                      }}
                    >
                      +
                    </button>
                  </div>
                  <div className="col-12 col-lg-6">
                    <button
                      className="btn btn-secondary"
                      onClick={() => handleRemove(product.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
      </div>
    </div>
  );
};

export default CartCard;

CartCard.propTypes = {
  product: PropTypes.object.isRequired,
  handleRemove: PropTypes.func.isRequired,
  handleQuantity: PropTypes.func.isRequired,
};
