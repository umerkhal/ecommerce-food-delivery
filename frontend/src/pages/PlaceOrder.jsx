import React, { useContext, useState } from "react";
import Title from "../component/Title";
import CartTotal from "../component/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {


  const [method, setMethod] = useState("cod");
  const {navigate,backendURL,cartItems, setCartItems, getCartAmount, delivery_fee,products} = useContext(ShopContext);
  const [formDate, setFormDate] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormDate(data({ ...data, [name]: value }));
  }

const onSubmitHandler = (event) => {
  event.preventDefault();
  try {
    let orderItems = [];
    for(const items in cartItems){
      for(const item in cartItems[items]){
        if (cartItems[items][item] > 0){
          const itemInfo = structuredClone(products.find(product =>product._id === items))
          if(itemInfo){
            itemInfo.size = item;
            itemInfo.quantity = cartItems[items][item];
            orderItems.push(itemInfo)
          }
        }
      }
    }
let orderData = {
  address : formDate,
  items : orderItems,
  amount: getCartAmount() + delivery_fee,
}
switch (method) {
  //Api Call for COD
  case "cod":
    const response = axios.post(backendURL + "/api/order/place",orderData,{headers:{token}} )
    if(response.data.success){
      setCartItems({});
      navigate('/orders')
    }else{
      toast.error(response.data.message)
    }
    break;
    case "stripe":
    const responseStripe = axios.post(backendURL + "/api/order/stripe",orderData,{headers:{token}})
    if(responseStripe.data.success){
      const {session_url} = responseStripe.data;
      window.location.replace(session_url)
    }else{
      toast.error(responseStripe.data.message)
    }

    break;


    default:
    break;
}
  } catch (error) {
    console.log(error)
    toast.error(error.message)
  }
}

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h[80vh] border-t">
      {/*------------------------Left Side------------------------ */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
        <Title text1={'DELIVERY'} text2={'INFORMACTION'}/>
        </div>
        <div className="flex gap-3">
        <input required onChange={onChangeHandler} name="firstName" value={formDate.firstName} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="First Name"/>
        <input required onChange={onChangeHandler} name="lastName" value={formDate.lastName} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Last Name"/>
        </div>
        <input required onChange={onChangeHandler} name="email" value={formDate.email} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="email" placeholder="Email Address"/>
        <input required onChange={onChangeHandler} name="street" value={formDate.street} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="email" placeholder="Street"/>
        <div className="flex gap-3">
        <input required onChange={onChangeHandler} name="city" value={formDate.city} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="City"/>
        <input required onChange={onChangeHandler} name="state" value={formDate.state} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="State"/>
        </div>
        <div className="flex gap-3">
        <input required onChange={onChangeHandler} name="zipCode" value={formDate.zipCode} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="number" placeholder="Zip Code"/>
        <input required onChange={onChangeHandler} name="country" value={formDate.country} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Country"/>
        </div>
        <input required onChange={onChangeHandler} name="phone" value={formDate.phone} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="number" placeholder="Phone"/>
      </div>
      {/*------------------------Right Side------------------------ */}
      <div className="mt-8">
      <div mt-8 min-w-80>
        <CartTotal/>
      </div>
        <div className="mt-12">
        <Title text1={'PAYMENT'} text2={'METHOD'}/>

        {/*------------------------Payment Method------------------------ */}
        
        <div className="flex gap-3 flex-col lg:flex-row">
          <div onClick={()=>setMethod("stripe")} className="flex gap-3 item-center border p-2 px-3 cursor-pointer">
            <p className={`min-w-3.5 h-3.5 border rounded-full ${method ==='stripe' ? "bg-green-400" :"" }`}></p>
            <img className="h-5 mx-4" src={assets.stripe_logo} alt="" />
          </div>
          <div onClick={()=>setMethod("rezorpay")} className="flex gap-3 item-center border p-2 px-3 cursor-pointer">
            <p className={`min-w-3.5 h-3.5 border rounded-full ${method ==='rezorpay' ? "bg-green-400" :"" }`}></p>
            <img className="h-5 mx-4" src={assets.razorpay_logo} alt="" />
          </div>
          <div onClick={()=>setMethod("cod")} className="flex gap-3 item-center border p-2 px-3 cursor-pointer">
            <p className={`min-w-3.5 h-3.5 border rounded-full ${method ==='cod' ? "bg-green-400" :"" }`}></p>
            <p className="text-gray-500 font-medium text-sm mx-4">CASH ON DELIVERY</p>
          </div>
        </div>
        <div className="w-full text-end mt-8">
        <button type="submit" className="bg-black text-white px-16 py-3 text-sm cursor-pointer">PLACE ORDER</button>
        </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
