import React, { use, useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';

const Login = () => {


  const [currentState, setCurrentState] = useState('Login');
  const {token,setToken, navigate,backendURL,} = useContext(ShopContext)
  

  const [name,setName] = useState('')
  const [password,setPassword] = useState('')
  const [email,setEmail] = useState('')

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (currentState === 'Sigin Up') {
        const response = await axios.post(backendURL + '/api/user/register',{name,email,password})
        if(response.data.success){
          setToken(response.data.token)
          localStorage.setToken('token' , response.data.token)
        }else{
          token.error(response.data.message)
        }
      }else{
        const response = await axios.post(backendURL + '/api/user/login',{email,password})
        if(response.data.success){
          setToken(response.data.token)
          localStorage.setToken('token',response.data.token)
        }else{
          token.error(response.data.message)
        }
      }
    } catch (error) {
      console.log(error)
      token.error(error.message)
    }
  }
  useEffect(() => {
    if(token){
      navigate('/')
    }
  },[token])
  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>
     {currentState === 'Login' ? '':<input onChange={(e)=> setName(e.target.value)} value={name} type="text" className='w-full px-3 py-2 border border-gray-800' required placeholder='Name' />} 
      <input onChange={(e)=> setEmail(e.target.value)} value={email} type="email" className='w-full px-3 py-2 border border-gray-800' required placeholder='Email' />
      <input onChange={(e)=> setPassword(e.target.value)} value={password} type="password" className='w-full px-3 py-2 border border-gray-800' required placeholder='Password' />
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer hover:underline'>Forget your password?</p>
        {
          currentState === 'Login'
           ? <p onClick={()=> setCurrentState('Sign Up')} className='cursor-pointer hover:underline'>Create Account</p>
           : <p onClick={()=> setCurrentState('Login')} className='cursor-pointer hover:underline'>Login Here</p>
        }
      </div>
      <button className='bg-black text-white font-light px-8 py-2 mt-4 cursor-pointer'>{currentState === 'Login' ? 'Sign In' : 'Sign Up'}</button>
    </form>
  )
}

export default Login
