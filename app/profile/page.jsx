"use client"

import React, { useContext } from 'react'
import { Context } from '@/components/Clients';
import { redirect } from "next/navigation"

const Page = () => {

  const { user } = useContext(Context)
  if (!user) return redirect("/login")

  return (
    <div className='profile-container'> 

      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  )
}

export default Page 