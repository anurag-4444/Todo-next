"use client";

import { Context } from '@/components/Clients';
import Link from 'next/link'
import React, { useContext, useState } from 'react'
import { redirect } from "next/navigation"
import toast from 'react-hot-toast';


const Page = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { user, setUser } = useContext(Context)

  const loginHandler = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email, password
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
      <section id='loginDiv'>
        <form onSubmit={loginHandler}>

          <input type="email" value={email} onChange={(e => setEmail(e.target.value))} placeholder='Enter Email' style={{ color: 'black' }} />

          <input type="password" value={password} onChange={(e => setPassword(e.target.value))} placeholder='Enter Password' style={{ color: 'black' }} />

          <button type='submit'>Login</button>
          <p>OR</p>
          <Link href={"/register"} style={{ color: 'black' }}>New User</Link>
        </form>
      </section>
    </div>
  )
}

export default Page