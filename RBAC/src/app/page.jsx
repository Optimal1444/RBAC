'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllProducts, GetFilteredProducts} from "./Services"
import { setItems } from './redux/LoginSlice';
import 'animate.css';
import Swal from "sweetalert2"

import { Suspense } from 'react';
export default function Home() {
    const [products,setProducts]=useState([])
    const router=useRouter()
    const searchRef=useRef()
    const user=useSelector(state=>state.login)
    const dispatch=useDispatch()
    const handleProductClick=(id)=>{
     router.push(`/${id}`)
    }
    const calculateItems=()=>{
        if(user.user){
            let cart=localStorage.getItem(user.user.uid)?localStorage.getItem(user.user.uid).split(','):[]
            let total=0
                for(let i=0; i<cart.length;i++){
                    if(cart[i]){
                        total+=parseInt(cart[i])
                    }
                }
                localStorage.setItem('items',total)
                dispatch(setItems(total))
        }
    }
    const handleAddToCart=(pid)=>{
        if(user.user)
        {
            let cart=localStorage.getItem(user.user.uid)?localStorage.getItem(user.user.uid).split(','):[]
            if(pid in cart)
                cart[pid]++;
            else 
                cart[pid]=1
            localStorage.setItem(user.user.uid,cart)
            calculateItems()
            Swal.fire({
                position: "top-middle",
                icon: "success",
                title: 'added',
                showConfirmButton: false,
                width:'16em',
                height:'4em',
                timer: 500
              });
        }
        else
        Swal.fire({
            title: "Sign-up for free",
            showClass: {
              popup: `
                animate__animated
                animate__fadeInUp
                animate__faster
              `
            },
            hideClass: {
              popup: `
                animate__animated
                animate__fadeOutDown
                animate__faster
              `
            }
          });
    }
    useEffect(()=>{
      
    GetAllProducts().then(response=>response.data).then(data=>{setProducts(data)})
    calculateItems()
    },[])
    const handleSearch=()=>{
      GetFilteredProducts(searchRef.current.value).then((response)=>{ setProducts(response.data)})
    }

    return(
        <>
         <div className="relative lg:w-1/2  w-3/4 mx-auto mt-10">
            <input ref={searchRef} type="search" id="search-dropdown" className="block py-2.5 px-4 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg rounded-s-lg  border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Search ..."  />
            <button onClick={handleSearch} type="submit" className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
                <span className="sr-only">Search</span>
            </button>
        </div>
        {/* <Suspense> */}
        <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1  py-20 gap-2 container mx-auto "  >
            {   products.map((product,index)=>
// 
                  <div key={index} className="animate__animated animate__fadeIn w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 text-center relative py-20 mx-auto"  >
                    <img className="p-8 rounded-t-lg mx-auto" src={product.image} alt="product image" onClick={()=>{handleProductClick(product.id)}} />            
                     <div className="px-5 pb-5 ">
                 <h5 className="lg:text-xs md:text-lg text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{product.title}</h5>
                 <div className="flex justify-center items-center  mt-2.5 mb-5">
                 <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3"></span>
                 </div>
                 

                 <div className="flex    items-center justify-center  absolute bottom-4 w-full gap-3">
                     <span className="text-xl font-bold text-gray-900 dark:text-white">${product.price}</span>
                     {user.user&&user.user.is_admin==0&&
                        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={()=>{handleAddToCart(product.id)}}>Add to cart</button>
                     }
                     {user.user&&user.user.is_admin!=0&&
                        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" 
                        onClick={()=>{
                            router.push(`addProduct?id=${product.id}`)
                        }}>Update</button>
                     }
                    </div>
                 </div>
                </div> 
                

            )

            
            } 
            {user.user&&user.user.is_admin!=0&&
              
              <div  className="animate__animated animate__fadeIn w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 text-center relative py-20 mx-auto flex items-center justify-center"  >
                  <button className="text-gray-900 bg-white border border-gray-300 focus:outline-none  focus:ring-4 focus:ring-gray-100 font-medium rounded-3xl text-2xl px-10 py-10 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600   dark:focus:ring-gray-700" 
                  onClick={()=>{router.push(`addProduct`)}}><img src="plus-solid.svg" alt='' /></button>
              </div>
            }
            </div>  
        {/* </Suspense> */}
                  
        </>
    )
}
