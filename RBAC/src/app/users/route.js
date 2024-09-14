import { NextResponse } from 'next/server'
import query from '../lib/db'
import bcrypt from 'bcrypt'

export async function GET(request) {  
        try{    
                const users=await query('select * from users')
                return NextResponse.json(users, { status: 200 });
        }
        catch (error) {
            return NextResponse.json({error:'Internal Server Error'}, { status: 500 });
        }
    }



export async function POST(request) {
        
        try{
                const res=await request.json()
                const email= await res.email
                const password= await res.password
                const users=await query('select * from users where email = ? ',[email])
                if (users.length === 0) {
                        return NextResponse.json( {error:'Invalid user name'}, { status: 404 });
                }
        
                const user=users[0]
                const match=bcrypt.compareSync(password, user.PASSWORD)
                if (!match) {
                        return NextResponse.json({error:'Invalid password'}, { status: 401 });
                }
        
                delete user.PASSWORD;
                delete user.id;
        
                return NextResponse.json(user, { status: 200 });
        }
        catch (error) {
            return NextResponse.json({error:'Internal Server Error'}, { status: 500 });
        }
    }

