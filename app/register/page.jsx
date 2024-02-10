"use client";

import { Context } from '@/components/Clients';
import Link from 'next/link'
import { redirect } from 'next/navigation';
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast';

const Page = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { user, setUser } = useContext(Context)

  const registerHandler = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({
          name, email, password
        }),
        headers: {
          "Content-Type": "application/json"
        }
      })
      const data = await res.json()
      if (!data.success) return toast.error(data.message)
      setUser(data.user)
      toast.success(data.message)
    } catch (err) {
      return toast.error(err.message)
    }
  }

  if (user._id) return redirect("/")
 
  return (
    <div className="login">
      <section>
        <form onSubmit={registerHandler}>
          <input type="text" value={name} onChange={(e => setName(e.target.value))} placeholder='Enter Name' style={{ color: 'black' }} />

          <input type="email" value={email} onChange={(e => setEmail(e.target.value))} placeholder='Enter Email' style={{ color: 'black' }} />

          <input type="password" value={password} onChange={(e => setPassword(e.target.value))} placeholder='Enter Password' style={{ color: 'black' }} />

          <button type='submit'>Sign Up</button>
          <p>OR</p>
          <Link href={"/login"} style={{ color: 'black' }}>Already User</Link>
        </form>
      </section>
    </div>
  )
}

export default Page