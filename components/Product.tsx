/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "../lib/client";

interface product {
  product: {
    image?: [HTMLImageElement];
    name?: string;
    slug:{ current?:string};
    price?: number;
  };
}

const Product = ({ product: { image, name, slug, price } }: product) => {
  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className="product-card">
          <img
            src={`${urlFor(image && image[0])}`}
            alt=""
            className='product-image'
          />
          <p className="product-name">{name}</p>
          <p className="product-price">${price}</p>
        </div>
      </Link>
    </div>
  );
};

export default Product;
