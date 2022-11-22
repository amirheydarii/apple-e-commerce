import { createContext, useContext, useState, useEffect, ReactNode, ReactPortal} from "react";
import toast, { Toast } from "react-hot-toast";

const Context = createContext({})

export const StateContext = ({children}: ReactNode|any) => {
    const [showCart, setShowCart] = useState(false)
    const [cartItem, setCartItem]:any = useState([])
    const [totalPrice, setTotalPrice]:any = useState(0)
    const [totalQuantities, setTotalQuantities]:any = useState(0)
    const [qty, setQty] = useState(1)

    let foundProduct: { quantity: number; price: any; };
    let index;

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

    const onRemove = (product: { _id: number; }) => {
        foundProduct = cartItem.find((item: { _id: number; }) => item._id === product._id)
        const newCartItem = cartItem.filter((item: { _id: number; }) => item._id !== product._id)

        setTotalPrice((prev: number) => prev - foundProduct.price * foundProduct.quantity)
        setTotalQuantities((prev: number) => prev - foundProduct.quantity)
        setCartItem(newCartItem)
    }

    const toggleCartItemQuanntity = (id:number, value:any) => {
        foundProduct = cartItem.find((item: { _id: number; }) => item._id === id)
        index = cartItem.findIndex((product: { _id: number; }) => product._id === id)

        const newCartItem = cartItem.filter((item: { _id: number; }) => item._id !== id)
        if ( value === 'inc' ) {

            setCartItem([...newCartItem, {...foundProduct, quantity: foundProduct.quantity + 1}])
            setTotalPrice((prev: any) => prev + foundProduct.price)
            setTotalQuantities((prev: number) => prev + 1)
        } else if ( value === 'dec' ) {

            if (foundProduct.quantity > 1) {
             setCartItem([...newCartItem, {...foundProduct, quantity: foundProduct.quantity - 1}])
             setTotalPrice((prev: any) => prev - foundProduct.price)
             setTotalQuantities((prev: number) => prev - 1)
            }
        }
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
            onAdd,
            toggleCartItemQuanntity,
            onRemove,
            setCartItem,
            setTotalPrice,
            setTotalQuantities
        }}>
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context)