import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '../lib/client'

interface footerBanner {
  footerBanner: {
    discount: string,
    largeText1: string,
    largeText2: string,
    saleTime: string,
    smallText: string,
    midText: string,
    product: string,
    buttonText: string,
    desc: string,
    image: HTMLImageElement
  }
}

const FooterBanner = ({footerBanner : {
  discount, largeText1, largeText2, saleTime, desc,
  smallText, midText, product, buttonText, image
}} : footerBanner) => {
  return (
    <div className='footer-banner-container'>
      <div className='banner-desc'>
        <div className="left">
          <p>{discount}</p>
          <h3>{largeText1}</h3>
          <h3>{largeText2}</h3>
          <p>{saleTime}</p>
        </div>
        <div className="right">
          <p>{smallText}</p>
          <h3>{midText}</h3>
          <p>{desc}</p>
          <Link href={`/product/${product}`}>
            <button type='button'>{buttonText}</button>
          </Link>
        </div>
        <img 
        src={`${urlFor(image)}`} 
        className={'footer-banner-image'}
        />
      </div>
    </div>
  )
}

export default FooterBanner