import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItems from "./ProductItems";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  },[products])

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={'LATEST'} text2={'COLLECTION'} />
        <p className="w-3/4 mx-auto text-xs sm:text-sm md:text-base text-gray-600">
        Learn all about how to implement font using the API CSS code. A web font is any font used in a website’s
        </p>
      </div>
      {/*-----------------------------------Rendring Products----------------------------------- */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {
          latestProducts.map((item,index)=>(
            <ProductItems key={index} id={item._id} name={item.name} price={item.price} image={item.image} />
          ))
        }
      </div>
    </div>
  );
};

export default LatestCollection;
