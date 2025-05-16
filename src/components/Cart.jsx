import { useContext } from "react";
import Modal from "./Modal";
import CartContext from "../store/CartContext";
import { currenctFormatter } from "../utils.js/formatter";
import UserProgressContext from "../store/UserProgressContext";
import Button from "./Button";
import CartItem from "./CartItem";

export default function Cart() {
  const cartContext = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const cartTotalPrice = cartContext.items.reduce(
    (totalPrice, item) => totalPrice + +item.price * +item.quantity,
    0
  );

  return (
    <Modal
      className="cart"
      open={userProgressCtx.progress == "cart"}
      onClose={
        userProgressCtx.progress == "cart" ? userProgressCtx.hideCart : null
      }
    >
      <ul>
        {cartContext.items.map((item) => {
          return (
            <CartItem
              key={item.id}
              cartItem={item}
              onIncreace={cartContext.addItem}
              onDecreace={cartContext.removeItem}
            />
          );
        })}
      </ul>
      <p className="cart-total-price">
        {currenctFormatter.format(cartTotalPrice)}
      </p>
      <p className="modal-actions">
        <Button onClick={userProgressCtx.hideCart} textOnly>
          Close
        </Button>
        {cartContext.items.length > 0 && (
          <Button onClick={userProgressCtx.showCheckout}>Checkout</Button>
        )}
      </p>
    </Modal>
  );
}
