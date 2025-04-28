import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../component/Title";
import axios from "axios";

const Order = () => {
  const { backendURL,token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const loadOrderData = async () => {
    try {
      if (!token) {
        return null
      }
      const response = await axios.post(backendURL + "/api/order/userorders",{},{headers:{token}} )
      if (response.data.success) {
        let allOrderItem = []
        response.data.orders.map((order) =>{
          order.orderItems.map((item) => {
            item ['status'] = order.status
            item ['payment'] = order.payment
            item ['paymentMethod'] = order.paymentMethod
            item ['date'] = order.date
            allOrderItem.push(item)
          })
        })
        setOrderData(allOrderItem.reverse())
      }

    } catch (error) {
      
    }
  }
  useEffect(() => {
    loadOrderData();
  },[token])
  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1={"My"} text2={"Order"} />
      </div>

      <div>
        {orderData.map((item, index) => (
          <div
            key={index}
            className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:justify-between gap-4">
            {/* ----------------------Product Information---------------------- */}
            <div className="flex gap-6 items-start text-sm">
              <img className="w-20 sm:w-20" src={item.image[0]} alt="" />
              <div>
                <p className="sm:text-base font-medium">{item.name}</p>
                <div className="flex gap-3 items-center mt-1 text-base text-gray-500">
                  <p>{currency}{item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Size {item.size}</p>
                </div>
                <p className="mt-1">Date: <span className="text-gray-400">{new Date(item.date).toDateString()}</span></p>
                <p className="mt-1">Payment: <span className="text-gray-400">{item.paymentMethod}</span></p>
              </div>
            </div>
            {/*------------------------ Shipping Status ------------------------*/}
            <div className="flex items-center gap-2">
              <p className="w-2 h-2 bg-green-500 rounded-full"></p>
              <p className="text-sm md:text-base">{item.status}</p>
            </div>
            {/*------------------------- Action Button------------------------- */}
            <div>
              <button onClick={loadOrderData} className="border px-4 py-2 text-sm font-medium cursor-pointer rounded-sm">Track Order</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
