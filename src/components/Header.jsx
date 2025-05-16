import { useContext } from "react";
import headerLogo from "./../assets/logo.jpg";
import Button from "./Button";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";

export default function Header() {
  const cartContext = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const totalNumberOfItemQuantity = cartContext.items.reduce(
    (totalNumberOfItem, item) => totalNumberOfItem + item.quantity,
    0
  );
  return (
    <header id="main-header">
      <div id="title">
        <img src={headerLogo} alt="" />
        <h1>Mini Store</h1>
      </div>
      <nav>
        <Button textOnly onClick={userProgressCtx.showCart}> Cart ({totalNumberOfItemQuantity})</Button>
      </nav>
    </header>
  );
}
