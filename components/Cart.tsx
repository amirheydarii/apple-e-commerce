/* eslint-disable @next/next/no-img-element */
import { Key, useRef } from "react"
import Link from "next/link"
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from "react-icons/ai"

import { TiDeleteOutline } from 'react-icons/ti'
import  toast  from "react-hot-toast"

import { useStateContext } from "../context/StateContext"
import { urlFor } from "../lib/client"

const Cart = () => {

  const cartRef = useRef()
  const { totalPrice, totalQuantities, cartItem, setShowCart }: any = useStateContext();
  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
        <button 
        type="button"
        className="cart-heading"
        onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <span className="heading">Your Cart</span>
          <span className="cart-numpitems">({totalQuantities} items)</span>
        </button>

        {cartItem.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150}/>
            <h3>Your shopping bag is empty</h3>
            <Link href='/'>
              <button
              type="button"
              onClick={() => setShowCart(false)}
              className='btn'
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}
        <div className="product-container">
          {cartItem.length >= 1 && cartItem.map((item: any ) => (
            <div className="product" key={item._id}>
              <img 
              src={urlFor(item?.image[0])} alt=""  
              className="cart-product-image"
              />
              <div className="item-desc">
                <div className="flex top">
                  <h5>{item.name}</h5>
                  <h4>${item.price}</h4>
                </div>
                <div className="flex bottom">
                  <div>
                  <p className='quantity-desc'>
              <span 
              className='minus' 
              onClick=''
              ><AiOutlineMinus/> </span>
              <span className='num'
              >0</span>
              <span 
              className='plus' 
              onClick=''
              ><AiOutlinePlus/> </span>
            </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Cart