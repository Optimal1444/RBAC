import { v4  } from 'uuid';
import query from '../../lib/db'
import bcrypt from 'bcrypt'
import { NextResponse } from 'next/server';
export async function POST(request) {


    const res=await request.json()
    const email= await res.email
    
    const password= await res.password
    const isAdmin=false
    
    const firstName= await res.firstName
    
    const lastName= await res.lastName
    const phoneNumber= await res.phoneNumber
    const address= await res.address
    const uid=v4()
    const hash = await bcrypt.hashSync(password, 10);
    const user=await query('insert into users (email,password,is_admin,first_name,last_name,phone_number,address,uid) values (? , ? , ? , ? , ? , ? , ? , ?) '
        ,[email,hash,isAdmin,firstName,lastName,phoneNumber,address,uid]  )
    if(user.affectedRows)
        return NextResponse.json({
            "email":email,
            // "password":password,
            "first_name":firstName,
            "last_name":lastName,
            "phone_number":password,
            "address":address,
            "uid":uid
        },{status:200})
    else return NextResponse.json({error:'Email already exists'},{status:409})
}

export async function PUT(request) {


    const res=await request.json()
    const email= await res.email
    const firstName= await res.first_name
    const lastName= await res.last_name
    const phoneNumber= await res.phone_number
    const address= await res.address
    const uid= await res.uid
    const is_admin=await res.is_admin
    const update_role=await res.update_role
    if(update_role){
        const user=await query('update users set is_admin=? where uid = ?'
            ,[is_admin,uid]  )
          if(user.affectedRows)
          {
                try{    
                        const users=await query('select * from users')
                        return NextResponse.json(users, { status: 200 });
                }
                catch (error) {
                    return NextResponse.json({error:'Internal Server Error'}, { status: 500 });
                }
            }
          else return Response.json({error:'Internal Server Error'}, { status: 500 })
    }
    const user=await query('update users set first_name = ? , last_name = ? ,  phone_number = ? , address = ? where uid = ?'
      ,[firstName,lastName,phoneNumber,address,uid]  )
    if(user.affectedRows)
        return Response.json({
            "email":email,
            "first_name":firstName,
            "last_name":lastName,
            "phone_number":phoneNumber,
            "address":address,
            "uid":uid
        },{ status: 200 })
    else return Response.json({error:'Internal Server Error'}, { status: 500 })
}
