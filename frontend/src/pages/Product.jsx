import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from './../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../component/RelatedProducts';

const Product = () => {
  const { productId } = useParams();
  const { products,currency,addToCart,cartItems } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');

  // Fetch Product Data
  const fetchProductData = () => {
    const foundProduct = products.find((item) => item._id === productId);
    if (foundProduct) {
      setProductData(foundProduct);
      setImage(foundProduct.image[0]); // Set the first image as default
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity duration-500 ease-in opacity-100'>
      {/*-------------------------------Product Data------------------------------- */}
      <div className='flex flex-col sm:flex-row gap-6'>
        {/*----------------------------Product Images (Thumbnails)---------------------------- */}
        <div className='flex flex-col sm:flex-row gap-3 sm:w-[15%]'>
          <div className='flex sm:flex-col gap-3 sm:overflow-y-auto'>
            {productData.image.map((item, index) => (
              <img src={item} key={index} className='w-20 h-20 sm:w-25 sm:h-25 object-cover cursor-pointer border border-gray-300 hover:border-black transition' alt="" onClick={() => setImage(item)}/>
            ))}
          </div>
        </div>

        {/*----------------------------Main Image---------------------------- */}
        <div className='flex-1 flex justify-start'>
          <img src={image} className='w-full max-w-[500px] object-contain' alt="" />
        </div>
      {/*-------------------------------Product Info------------------------------- */}
      <div className='flex-1'>
            <h1 className='font-medium text-2xl mt-1'>{productData.name}</h1>
            <div className='flex items-center gap-1 mt-2'>
            <img src="" alt="" />
            <img className='w-3.5' src={assets.star_icon} alt="" />
            <img className='w-3.5' src={assets.star_icon} alt="" />
            <img className='w-3.5' src={assets.star_icon} alt="" />
            <img className='w-3.5' src={assets.star_icon} alt="" />
            <img className='w-3.5' src={assets.star_dull_icon} alt="" />
            <p className='pl-2'>(122)</p>
            </div>
            <p className='mt-1 text-3xl font-medium'>{currency} {productData.price}</p>
            <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
            <div className='flex flex-col gap-4 my-4'>
            <p>Select Size</p>
            <div className='flex gap-2'>
            {
              productData.sizes.map((item,index) =>(
                <button onClick={()=> setSize(item)} className={`py-2 px-4 bg-gray-100 ${item === size ? 'border border-orange-500' : ''}`} key={index}>{item}</button>
              ))
            }
            </div>
           </div>
          <button onClick={()=> addToCart(productData._id,size)} className='bg-black text-white py-3 px-8 text-sm'>ADD TO CART</button>
          <hr className='mt-4 sm:w-4/5' />
          <div className='text-sm text-gray-500 flex flex-col gap-1'>
            <p>100% Original product</p>
            <p>Cash on delivery is available on this product</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
      </div>
    </div>
    {/*-----------------------------Description & Review Sections------------------------- */}
    <div className='mt-20'>
            <div className='flex'>
            <b className='border px-5 py-3 text-sm'>Descriptions</b>
            <p className='border px-5 py-3 text-sm'>Review (122)</p>
            </div>
            <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-600'>
            <p>"The glowing city skyline shimmered against the deep indigo sky, as a gentle breeze carried whispers of distant laughter. Somewhere, a cat darted across the empty street, its silhouette flickering under the neon lights. Time felt slower here, as if the world had paused just for a moment to admire its own beauty."Let me know if you need something specific!  </p>
            <p>"The glowing city skyline shimmered against the deep indigo sky, as a gentle breeze carried whispers of distant laughter. Somewhere, a cat darted across the empty street, its silhouette flickering under the neon lights. Time felt slower here, as if the world had paused just for a moment to admire its own beauty."</p>
        </div>
    </div>
            {/*-----------------------------Related Products------------------------- */}
    <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
  ) : (
    <div className='opacity-0'></div>
  );
};

export default Product;
