'use client'
import { useEffect, useState } from "react"
import {getUsers, updateUser} from '../../Services'
import { useSelector } from "react-redux"
export default function Dashboard(){
    const [users,setUsers]=useState()
    const state=useSelector(state=>state.login)
    useEffect(()=>{
        getUsers().then((res)=>res.data).then((data)=>{setUsers(data)})
    },[])
    const setAsEditor=(user)=>{
        updateUser({'uid':user['uid'],'is_admin':2,'update_role':true}).then((res)=>res.data).then((data)=>{setUsers(data)})
    }
    const setAsViewer=(user)=>{
        updateUser({'uid':user['uid'],'is_admin':0,'update_role':true}).then((res)=>res.data).then((data)=>{setUsers(data)})
    }
    return(
      
        <>
        {state.user&&state.user.is_admin==1&&
        <div className="overflow-x-auto container mx-auto my-10 ">
            <table className="min-w-full text-left text-sm font-light text-surface dark:text-white">

            <thead>
              <tr >
                <th className=" px-3 py-4 border text-center ">First name</th>
                <th className=" px-3 py-4 border text-center ">Last Name</th>
                <th className=" px-3 py-4 border text-center ">Email address</th>
                <th className=" px-3 py-4 border text-center ">Role</th>
                <th className=" px-3 py-4 border text-center ">Change role</th>
              </tr>
            </thead>
            <tbody>
            {users&&users.map((user,index)=>
              <tr key={index}>
                <td className=" px-3 py-4 border text-center ">{user['first_name']}</td>
                <td className=" px-3 py-4 border text-center ">{user['last_name']}</td>
                <td className=" px-3 py-4 border text-center ">{user['email']}</td>
                <td className=" px-3 py-4 border text-center ">{
                user['is_admin']==0?'Viewer':user['is_admin']==2?'Editor':'Admin'
                }
                </td>
                {user['is_admin']==1&&
                    <td className='bg-orange-400'>
                    
                    </td>
                }
                {user['is_admin']!=1&&
                    <td  className=" px-3 py-4 border text-center ">
                        <button className="btn bg-red-600 text-white px-3 py-2 mx-2 rounded-md " onClick={()=>{setAsEditor(user)}} >Editor</button>
                        <button className="btn bg-black   text-white  px-3 py-2 mx-2 rounded-md " onClick={()=>{setAsViewer(user)}}>Viewer</button>
                    </td>
                }
              </tr>
                  )}
            </tbody>
          </table>
          </div>
        }  
        </>
        
    )
}