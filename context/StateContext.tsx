import { createContext, useContext, useState, useEffect, ReactNode, ReactPortal} from "react";
import toast, { Toast } from "react-hot-toast";

const Context = createContext({})

export const StateContext = ({children}: ReactNode|any) => {
    const [showCart, setShowCart] = useState(false)
    const [cartItem, setCartItem]:any = useState([])
    const [totalPrice, setTotalPrice]:any = useState()
    const [totalQuantities, setTotalQuantities]:any = useState(0)
    const [qty, setQty] = useState(1)

    const onAdd = (product: { _id: any; price: number; quantity: any; name: any; }, quantity: number) => {
        const checkProductInCart = cartItem.find((item: { _id: any; }) => item._id === product._id);

        setTotalPrice((prevTotalPrice: number) => prevTotalPrice + product.price * quantity)
        setTotalQuantities((prevTotalQuanities: number) => prevTotalQuanities + quantity)

        if (checkProductInCart) {

            const updatedCartItems: any = cartItem.map((cartProduct: {_id: any; quanitity: number }) => {
                if (cartProduct._id === product._id) return {
                    ...cartProduct,
                    quantity: cartProduct.quanitity + quantity
                }
            })

            setCartItem(updatedCartItems);
        } else {
            product.quantity = quantity;

            setCartItem([...cartItem, {...product}])
        }

        toast.success(`${qty} ${product.name} added to the cart`)
    }

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
            setShowCart,
            cartItem,
            totalPrice,
            totalQuantities,
            qty,
            incQty,
            decQty,
            onAdd
        }}>
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context)