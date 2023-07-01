import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import CartCard from "../../components/CartCard/CartCard";
import ProductCard from "../../components/ProductCard/ProductCard";
import { removeFromCart, clearCart } from "../../redux/slices/cartSlice";
import { Carts, Products } from "../../services/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cart = () => {
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const cartDatabase = useSelector((state) => state.cart.cart);
  const [cartProducts, setCartProducts] = useState([]);
  const [randomProducts, setRandomProducts] = useState([]);

  useEffect(() => {
    const updatedCartProducts = products
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

    setCartProducts(updatedCartProducts);
  }, [products, cartDatabase]);

  useEffect(() => {
    const filteredProducts = products.filter((product) => {
      const cartProductIds = cartProducts.map((product) => product.id);
      return !cartProductIds.includes(product.id);
    });

    const shuffledProducts = filteredProducts.sort(() => Math.random() - 0.5);

    setRandomProducts(shuffledProducts.slice(0, 4));
  }, [products, cartProducts]);

  const fetchProductStock = async (productId) => {
    const product = await Products.getOne(productId);
    return product.rating.count;
  };

  const handleRemove = async (id) => {
    dispatch(removeFromCart(id));
    const newCartDatabase = cartDatabase[0].products.filter(
      (product) => product.productId !== id
    );
    Carts.editOne(cartDatabase[0].id, {
      ...cartDatabase[0],
      products: newCartDatabase,
    });

    setCartProducts(cartProducts.filter((product) => product.id !== id));
  };

  const handleQuantity = async (id, quantity) => {
    const stock = await fetchProductStock(id);
    if (quantity <= stock) {
      const newCartProducts = cartProducts.map((product) => {
        if (product.id === id) {
          return {
            ...product,
            quantity: quantity,
          };
        }
        return product;
      });

      setCartProducts(newCartProducts);

      const newCartDatabase = cartDatabase[0].products.map((product) => {
        if (product.productId === id) {
          return {
            ...product,
            quantity: quantity,
          };
        }
        return product;
      });

      Carts.editOne(cartDatabase[0].id, {
        ...cartDatabase[0],
        products: newCartDatabase,
      });
    } else {
      if (stock === 0) {
        toast.error("This product is out of stock.");
        return;
      }

      const stockMessage = `You are trying to add ${quantity} items, but only ${stock} items are available in stock.`;
      toast.error(stockMessage);
    }
  };

  const handleCheckout = async () => {
    let outOfStockProducts = [];

    for (const cartProduct of cartProducts) {
      const productStock = await fetchProductStock(cartProduct.id);
      const newStock = productStock - cartProduct.quantity;

      if (newStock < 0) {
        outOfStockProducts.push(cartProduct.title);
      } else {
        delete cartProduct.quantity;
        Products.editOne(cartProduct.id, {
          ...cartProduct,
          rating: {
            ...cartProduct.rating,
            count: newStock,
          },
        });

        if (newStock === 0 && cartProduct.quantity > 0) {
          toast.warn(`${cartProduct.title} is now out of stock!`);
        }
      }
    }

    if (outOfStockProducts.length > 0) {
      const outOfStockMessage = outOfStockProducts.join(", ");
      toast.error(
        `The following products are out of stock: \n${outOfStockMessage}`
      );
      return;
    }

    emptyCart();
  };

  const emptyCart = async () => {
    Carts.removeCart(cartDatabase[0].id);
    dispatch(clearCart());
  };

  useEffect(() => {
    const total = cartProducts.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
    setTotal(total.toFixed(2));
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
            {randomProducts.map((product) => (
              <div className="col-12 col-lg-3" key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Cart;
