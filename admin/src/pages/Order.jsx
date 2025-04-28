import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import {backendUrl, currency} from '../App'
import { toast } from 'react-toastify';
import { assets } from '../assets/assets'

const Order = ({token}) => {
  const [orders, setOrders] = useState([])

  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }
    try {
      const response = await axios.post(backendUrl + '/api/orders/list', {}, {headers: {token}})
      if (response.data.success) {
        setOrders(response.data.orders)
      }else{
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      res.json({message: 'Something went wrong in FatchAllOrders'})
    }

  }
const statusHandler = async (event,orderId) => {
  try {
    const response = await axios.post(backendUrl + '/api/orders/status', {orderId, status:event.target.value}, {headers: {token}})
    if(response.data.success){
      await fetchAllOrders()
    }
  } catch (error) {
    console.log(error)
    toast.error(response.data.error) 
  }
  
}



useEffect(() => {
  fetchAllOrders()
},[token])

  return (
    <div>
      <h3>Orders Page</h3>
      <div>
        {
          orders.map((order, index) => {
         <div className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] items-start border-gray-300 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700 gap-3' key={index}>
          <img className='w-12' src={assets.parcel_icon} alt="" />
          <div>
          <div>
            {order.item.map((item, index) =>{
                if (index === order.item.length -1) {
                  return <p className='py-0.5' key={index}>{item.name} x {item.quantity} <span>{item.size}</span></p>
                }
                else{
                  return <p className='py-0.5' key={index}>{item.name} x {item.quantity} <span>{item.size}</span>,</p>}})}
          </div>
          <p className='mt-3 mb-2 font-medium'>{order.address.firstName + '' + order.address.lastName}</p>
          <div>
            <p>{order.address.street + ' ,' }</p>
            <p>{order.address.street + ' ,' + order.address.state + ' ,' + order.address.city + ' ,' + order.address.country + ' ,' + order.address.zipCode}</p>
          </div>
          <p>{order.address.phone}</p>
         </div>
         <div>
         <p className='text-sm sm:text-[15]'>Item :{order.item.length}</p>
         <p className='mt-3'>Method :{order.paymentMethod}</p>
         <p>Payment :{order.payment ? 'Done' : 'Panding'}</p>
         <p>Date :{new Date(order.date).toLocaleDateString()}</p>
         </div>
         <p className='text-sm sm:text-[15]'>{currency}{order.amount}</p>
         <select onChange={(event) => statusHandler(event,order._id)} value={order.status} className='p-2 text-semibold'>
          <option value="Order Placed">Order Placed</option>
          <option value="Paking">Paking</option>
          <option value="Shipped">Shipped</option>
          <option value="Out for Delivery">Out for Delivery</option>
          <option value="Delivered">Delivered</option>
         </select>
         </div>
         })
         }
      </div>
    </div>
  )
}

export default Order
