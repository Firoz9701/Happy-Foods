import React, { useContext } from 'react'
import Modal from './UI/Modal.jsx'
import CartContext from '../../Store/CartContext.jsx'
import { currencyFormatter } from '../util/formatting.js'
import Button from './UI/Button.jsx'
import UserProgressContext from '../../Store/UserProgressContext.jsx'
import CartItem from './CartItem.jsx'
export default function  Cart(){
  const cartCtx = useContext(CartContext)
  const UserProgressCtx  = useContext(UserProgressContext)

  const cartItemTotalPrice = cartCtx.items.reduce((totalPrice,item) => totalPrice + item.quantity * item.price,0)
  function handleHideCart(){{
    UserProgressCtx.hideCart()
  }}

  function handleOpenCheckout(){
    UserProgressCtx.ShowCheckout()
  }
 
  

    return (
    <Modal  className='cart' open={UserProgressCtx.progress === 'cart'} onClose={UserProgressCtx.progress === 'cart' ? handleHideCart : undefined}>
            <h2>Your Cart</h2>
            <ul>
                {cartCtx.items.map((item) => (
                   <CartItem key={item.id} {...item} onIncrease={() => cartCtx.addItem(item)} onDecrease={() => cartCtx.removeItem(item.id)}/>
                ))}

            </ul>
            <p className='cart-total'>{currencyFormatter.format(cartItemTotalPrice)}</p>
            <p className='modal-actions'>
              <Button textOnly onClick={handleHideCart}>Close</Button>
              {cartCtx.items.length > 0 && <Button onClick={handleOpenCheckout}>Got to Checkout</Button>}
            </p>
    </Modal>
  )
}

