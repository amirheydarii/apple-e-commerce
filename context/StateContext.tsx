import { createContext, useContext, useState, useEffect, ReactNode, ReactPortal} from "react";
import { Toast } from "react-hot-toast";

const Context = createContext()

export const StateContext = ({children}: ReactNode|any) => {
    const [showCart, setShowCart] = useState(false)
    const [cartItem, setCartItem] = useState()
    const [totalPrice, setTotalPrice] = useState()
    const [totalQuantities, setTotalQuantities] = useState()
    const [qty, setQty] = useState(1)

    const incQty = () => {
        setQty((prevQty) => prevQty + 1)
    }

    const decQty = () => {
        setQty((prevQty) => {
            if(prevQty - 1 < 1) return 1

            return prevQty - 1
        })
    }

    return (
        <Context.Provider 
        value={{
            showCart,
            cartItem,
            totalPrice,
            totalQuantities,
            qty
        }}>
            {children}
        </Context.Provider>
    )
}