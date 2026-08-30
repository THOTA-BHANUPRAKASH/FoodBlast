import { useContext } from "react";
import { CartContext } from "../context/cartContext";
import { API_URL } from "../api";
import NavBar from "./NavBar";

const Cart = () => {
  const { cart, increaseQuantity, decreaseQuantity } = useContext(CartContext);

  const totalAmount = cart.reduce((total, item) => {
    return total + Number(item.price) * item.quantity;
  }, 0);

  return (
    <div className="cartPage">
      <NavBar />
      <h1>Your Cart</h1>

      {cart.length === 0 ? (
        <div className="emptyCart">
          😔
          <h2>Your cart is empty</h2>
        </div>
      ) : (
        <>
          <div className="cartItems">
            {cart.map((item) => (
              <div className="cartItem" key={item._id}>
                <img
                  src={`${API_URL}/uploads/${item.image}`}
                  alt={item.productName}
                  className="cartProductImage"
                />

                <div className="cartProductDetails">
                  <h2>{item.productName}</h2>

                  <p>₹{item.price}</p>

                  <div className="quantityContainer">
                    <button
                      className="quantityButton"
                      onClick={() => decreaseQuantity(item._id)}
                    >
                      −
                    </button>

                    <span className="quantity">{item.quantity}</span>

                    <button
                      className="quantityButton"
                      onClick={() => increaseQuantity(item._id)}
                    >
                      +
                    </button>
                  </div>

                  <p>Subtotal: ₹{Number(item.price) * item.quantity}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="cartTotal">
            <h2>Total Bill</h2>

            <h2>₹{totalAmount}</h2>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
