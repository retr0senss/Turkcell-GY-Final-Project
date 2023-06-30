import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import CartCard from "../../components/CartCard/CartCard";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../../redux/slices/cartSlice";
import { Carts, Products } from "../../services/api";

const Cart = () => {
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const cartDatabase = useSelector((state) => state.cart.cart);
  const cartProducts = products
    .map((product) => {
      const cartProduct = cartDatabase[0]?.products.find(
        (cartProduct) => cartProduct.productId === product.id
      );
      if (cartProduct) {
        return {
          ...product,
          quantity: cartProduct.quantity,
        };
      }
      return null;
    })
    .filter((product) => product !== null);

  const randomProducts = products
    .filter((products) => {
      const cartProductIds = cartProducts.map((product) => product.id);
      return !cartProductIds.includes(products.id);
    })
    .sort(() => Math.random() - 0.5);

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
    cartProducts.filter((product) => product.id !== id);
    const newCartDatabase = cartDatabase[0].products.filter(
      (product) => product.productId !== id
    );
    Carts.editOne(cartDatabase[0].id, {
      ...cartDatabase[0],
      products: newCartDatabase,
    });
  };

  const handleQuantity = (id, quantity) => {
    /*  const newCartDatabase = cartDatabase[0].products.map((product) => {
      if (product.productId === id) {
        return {
          ...product,
          quantity: product.quantity + quantity,
        };
      }
    }); */

    cartProducts.map((product) => {
      if (product.id === id) {
        product.quantity = product.quantity + quantity;
      }
    });

    /*  Carts.editOne(cartDatabase[0].id, {
      ...cartDatabase[0],
      products: newCartDatabase,
    }); */
  };

  const handleCheckout = () => {
    cartProducts.map((cartProduct) => {
      const newStock =
        products.find((product) => product.id === cartProduct.id).rating.count -
        cartProduct.quantity;
      delete cartProduct.quantity;
      Products.editOne(cartProduct.id, {
        ...cartProduct,
        rating: {
          rate: cartProduct.rating.rate,
          count: newStock,
        },
      });
    });
    emptyCart();
  };

  const emptyCart = () => {
    Carts.removeCart(cartDatabase[0].id);
    dispatch(clearCart());
  };

  useEffect(() => {
    const total = cartProducts.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
    setTotal(total);
  }, [cartProducts]);

  return (
    <div className="container p-5 mt-5">
      <div className="row mt-5">
        <div className="col-6">
          <h1>Cart</h1>
        </div>
        <div className="col-6">
          <button
            className="btn btn-primary float-end"
            disabled={cartProducts.length === 0}
            onClick={emptyCart}
          >
            Clear Cart
          </button>
        </div>
        <hr />
      </div>
      {cartProducts.length > 0 &&
        cartProducts.map((product) => (
          <CartCard
            product={product}
            key={product.id}
            handleRemove={handleRemove}
            handleQuantity={handleQuantity}
          />
        ))}
      {cartProducts.length === 0 && (
        <div className="row">
          <div className="col-12">
            <h3>Cart is empty</h3>
          </div>
        </div>
      )}
      <div className="row mt-5">
        <div className="col-12">
          <div className="d-flex flex-wrap justify-content-between">
            <h3>Total: ${total}</h3>
            <button
              className="btn btn-primary"
              disabled={cartProducts.length === 0}
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </div>
          <hr />
          <div className="row mt-5">
            <h3>Recommended Products</h3>
            <hr />
            {randomProducts?.slice(0, 4).map((product) => (
              <div className="col-12 col-lg-3" key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
