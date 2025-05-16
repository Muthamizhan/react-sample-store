import { useContext } from "react";
import Modal from "./Modal";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";
import { currenctFormatter } from "../utils.js/formatter";
import Input from "./Input";
import Button from "./Button";
import useHttp from "../hooks/http";

const configurationObj = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userCtx = useContext(UserProgressContext);
  const { data, isLoading, error, sendRequest, clearData} = useHttp(
    "http://localhost:3000/orders",
    configurationObj
  );

  const cartTotal = cartCtx.items.reduce(
    (totalPriceAccumulator, item) =>
      totalPriceAccumulator + +item.price * +item.quantity,
    0
  );

  async function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const customer = Object.fromEntries(fd.entries());
    console.log(customer);
    const reqBody = JSON.stringify({
      order: {
        customer,
        items: cartCtx.items,
      },
    });
    sendRequest(reqBody);
    // const response = await fetch("http://localhost:3000/orders", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     order: {
    //       customer,
    //       items: cartCtx.items,
    //     },
    //   }),
    // });
  }

  function handleClose(){
    userCtx.hideCheckout();
    cartCtx.clearCart();
    clearData();
  }

  let actions = (
    <>
      <Button textOnly onClick={userCtx.hideCheckout}>
        Close
      </Button>
      <Button>Place Order</Button>
    </>
  );

  if (isLoading) {
    actions = "Data is sending to backe";
  }

  if (data && !error) {
    return (
      <Modal
        open={userCtx.progress == "checkout"}
        onClose={handleClose}
      >
        <p> Order is placed successfully</p>
        <p>
          <Button onClick={handleClose}>Close</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal open={userCtx.progress == "checkout"} onClose={userCtx.hideCheckout}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount : {currenctFormatter.format(cartTotal)}</p>

        <Input type="text" label="first Name" id="name" />
        <Input type="text" label="Last Name" id="lName" />
        <Input type="email" label="Email Address" id="email" />
        <Input type="text" label="Street" id="street" />
        <div className="control-row">
          <Input type="text" label="Postal" id="postal-code" />
          <Input type="text" label="city" id="city" />
          <Input type="phone" label="Phone Number" id="city" />
        </div>

        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}
