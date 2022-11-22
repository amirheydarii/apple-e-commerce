import { useState, useEffect } from "react";
import Link from "next/link";
import { BsBagCheckFill } from "react-icons/bs";


import { useStateContext } from "../context/StateContext";
import { runFirework } from '../lib/utils'

function Success(): any {
  const { setCartItem, setTotalPrice, setTotalQuantities }: any = useStateContext();

  useEffect(() => {
    localStorage.clear()
    setCartItem([])
    setTotalPrice(0)
    setTotalQuantities(0)
    runFirework()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  return (
    <div className="success-wrapper">
      <div className="success">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2>Thank you for your order!</h2>
        <p className="email-msg">Check your email inbox</p>
        <p className="description">
          If you have any questions, click here:
          <a href="mailto:order@appleExample" className="email">
            order@appleExample
          </a>
        </p>
        <Link href='/'>
          <button type="button" className="btn">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Success;
