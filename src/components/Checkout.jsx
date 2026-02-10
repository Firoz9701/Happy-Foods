import React, { useContext } from 'react'
import Modal from './UI/Modal'
import CartContext from '../../Store/CartContext.jsx'
import { currencyFormatter } from '../util/formatting';
import Input from './Input.jsx';
import UserProgressContext from '../../Store/UserProgressContext.jsx';
import Button from './UI/Button.jsx';
import useHttp from '../hooks/useHttp.js';
import { useActionState } from 'react';



const Checkout = () => {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const {
    data,
    error,
    isLoading: isSending, 
    sendRequest,
    clearData
  } = useHttp('http://localhost:3000/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const cartItemTotalPrice = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  function handleCloseCheckout() {
    userProgressCtx.hideCheckout();
  }

function handleFinish(){
    userProgressCtx.hideCheckout();
    cartCtx.clearCart()
    clearData()

}
/* 
  function checkoutFormAction(prevState,fd) {
   
    const customerData = Object.fromEntries(fd.entries());

     sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      })
    );

  }
  const [formState,formAction,isSending] = useActionState(checkoutFormAction,null)

  console.log(isSending) */

  function handleFormSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());

     sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      })
    );

  } 


  if (data) {
    return (
      <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleCloseCheckout}>
        <h2>Success!</h2>
        <p>Your order was submitted successfully.</p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    );
  }

  let actions = (
    <>
      <Button type="button" textOnly onClick={handleCloseCheckout}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );

  if (isSending) {
    actions = <span>Sending order data...</span>;
  }

  return (
    <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleCloseCheckout}>
      <form onSubmit={handleFormSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(cartItemTotalPrice)}</p>
        <Input label="Full Name" type="text" id="name" />
        <Input label="E-Mail Address" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>
        {error && <p className="error">Failed to submit order: {error}</p>}
        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
};


export default Checkout