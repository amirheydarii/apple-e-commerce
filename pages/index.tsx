import React from "react";
import {client} from '../lib/client'
import { Product, FooterBanner, HeroBanner} from '../components'

const Home = ({products, bannerData}: any) => {
  return (
    <>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]}/>
      
      <div className="products-heading">
        <h2>Best Selling Product</h2>
        <p>Best Smartphone Have Ever Seen</p>
      </div>

      <div className="products-container"> 
        { products?.map( 
          (product: any) => <Product key={product._id} product={product} />) }
      </div>
      {console.log(products)}
      <FooterBanner footerBanner={bannerData && bannerData[0]}/>
    </>
  );
};

export const getServerSideProps =async () => {
  const query = '*[_type == "product"]'
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]'
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: {products, bannerData}
  }
}

export default Home;
