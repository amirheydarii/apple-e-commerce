/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Image from 'next/image'
import { urlFor, client } from '../../lib/client'
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { Product } from '../../components';

interface props {
  product:{
    image?: HTMLImageElement | any,
    name?: string,
    detailes?: string,
    price?: string
  },
  products: {
    map(arg0: (item: { _id: React.Key | null | undefined; }) => JSX.Element): React.ReactNode;
    slug:{current: string}
    image?: HTMLImageElement | any,
    name?: string,
    detailes?: string,
    price?: string
  }
}
const ProductDetails = ({product, products}: props) => {

  const {image, name, detailes, price} = product;
  console.log(product , products);
  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className='image-container'>
            <img src={`${urlFor(image && image[0])}`} alt="" />
          </div>
          {/* <div className='small-images-container'>
            {image?.map((item, i) => (
              <img 
              src={`${urlFor(item)}`} 
              className=''
              onMouseEnter=''
              alt="" />
            ))}
          </div> */}
        </div>

        <div className='product-detail-desc'>
          <h1>{name}</h1>
          <div className='reviews'>
            <div>
              <AiFillStar/>
              <AiFillStar/>
              <AiFillStar/>
              <AiFillStar/>
              <AiOutlineStar/> 
            </div>
            <p>
              (20)
            </p>
          </div>
          <h4>Detailes: </h4>
          <p>{detailes}</p>
          <p className='price'>${price}</p>
          <div className='quantity'>
            <h3>Quantity</h3>
            <p className='quantity-desc'>
              <span className='minus'
              ><AiOutlineMinus/> </span>
              <span className='num'
              >0</span>
              <span className='plus'
              ><AiOutlinePlus/> </span>
            </p>
          </div>
          <div className="buttons">
            <button 
            type='button'
            className='add-to-cart'
            // onClick={}
            >Add to Cart</button>
            <button 
            type='button'
            className='buy-now'
            // onClick={}
            >Buy Now</button>
          </div>
        </div>
      </div>

      <div className='maylike-products-wrapper'>
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products.map((item) => (
              <Product key={item._id} product={item}/>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }`;

  const products = await client.fetch(query);

  const paths = products.map((product: { slug: { current: any } }) => ({
    params: {
      slug: product.slug.current
    }
  }));

  return {
    paths,
    fallback: 'blocking'
  }
} 

export const getStaticProps = async ({params: {slug}}: any) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`
  const productsQuery = '*[_type == "product"]'

  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery)

  return {
    props: {product, products}
  }
}

export default ProductDetails