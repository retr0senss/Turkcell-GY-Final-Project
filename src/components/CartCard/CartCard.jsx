import PropTypes from "prop-types";

const CartCard = ({ product, handleRemove, handleQuantity }) => {
  return (
    <div className="row">
      <div className="col-12">
        <div className="row">
          <div className="col-12 col-lg-2">
            <img
              src={product.image}
              alt="Product"
              className="img-fluid rounded"
            />
          </div>
          <div className="col-12 col-lg-10 d-flex align-items-center ">
            <div className="row justify-content-between w-100">
              <div className="col-12 col-lg-6">
                <h3>{product.title}</h3>
                <p>Price: ${product.price}</p>
              </div>
              <div className="col-12 col-lg-6 ">
                <div className="row ">
                  <div className="col-12 col-lg-6 d-flex gx-5">
                    <button className="btn btn-primary">-</button>
                    <input
                      type="number"
                      className="form-control mx-4"
                      value={product.quantity}
                      readOnly
                    />
                    <button
                      className="btn btn-primary"
                      onClick={() => handleQuantity(product.id, 1)}
                    >
                      +
                    </button>
                  </div>
                  <div className="col-12 col-lg-6">
                    <button
                      className="btn btn-danger"
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
