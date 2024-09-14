'use client'
import { useEffect, useRef } from "react"
import { handleLogOut, registerUser } from "../../redux/LoginSlice"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/navigation"
 function SignUp(){
    const mailRef=useRef()
    const passRef=useRef()
    const firstNameRef=useRef()
    const lastNameRef=useRef()
    const phoneRef=useRef()
    const addressRef=useRef()
    const dispatch=useDispatch()
    const navigate=useRouter()
    const {loading,error,user}=useSelector((state)=>state.login)
    const handleClick=()=>{
      console.log(addressRef.current.value)
        let cred={
          'email':mailRef.current.value,
          'password':passRef.current.value,
          'firstName':firstNameRef.current.value,
          'lastName':lastNameRef.current.value,
          'phoneNumber':phoneRef.current.value,
          'address':addressRef.current.value
        }
        dispatch(registerUser(cred))
    }
    useEffect(()=>{
      if(user){
          navigate.push('/')
      }
      else{
        dispatch(handleLogOut())
      }
    },[user])
    
    return(
        <>
        <div className="kufam flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign up for free!
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm ">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                E-mail
              </label>
              <div className="mt-2">
                <input
                  ref={mailRef}
                  type="email"
                  autoComplete="email"
                  required
                  className=" px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                
                
              </div>              
              <div className="mt-2">
                <input
                  ref={passRef}
                  type="password"
                  autoComplete="current-password"
                  required
                  className="px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              
            </div>
            <div className="flex gap-2 justify-between">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                First name
              </label>
              <div className="mt-2">
                <input
                  ref={firstNameRef}
                  type="text"
                  required
                  className=" px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Last name
              </label>
              <div className="mt-2">
                <input
                  ref={lastNameRef}
                  type="text"
                  required
                  className=" px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>  
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Phone number
              </label>
              <div className="mt-2">
                <input
                  ref={phoneRef}
                  type="text"
                  required
                  className=" px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Address
              </label>
              <div className="mt-2">
                <input
                  ref={addressRef}
                  type="text"
                  required
                  className=" px-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                onClick={handleClick}
                className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 my-4"
              >
                {loading?'loading .....':'login'}
              </button>
            </div>

            {error&&
            <div className="flex justify-center mt-10">
            <span className="bg-red-100 text-red-800 text-xl font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300 border border-1 ">{error}</span>
            </div>

            }
        </div>
      </div>
        </>
    )
 }
 export default SignUp