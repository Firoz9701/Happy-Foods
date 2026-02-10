import {createContext, useState} from 'react'

const UserProgressContext = createContext({
    progress:'',
    showCart:() => {},
    hideCart:() => {},
    ShowCheckout:() => {},
    hideCheckout:() => {},
})
export const UserProgressContextProvider = ({children}) => {
   const [userProgressSate,setUserProgress] = useState()

   function showCart(){
   setUserProgress('cart');
   }
   function hideCart(){
     setUserProgress('')
   }
   function ShowCheckout(){
       setUserProgress('checkout')
   }
   function hideCheckout(){
        setUserProgress('')
   }
   console.log(userProgressSate)
   const userProgressCtx ={
    progress:userProgressSate,
    showCart,
    hideCart,
    ShowCheckout,
    hideCheckout
   }
    return (
      <UserProgressContext value={userProgressCtx}>{children}</UserProgressContext>
  )
}

export default UserProgressContext