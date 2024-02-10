"use client";

import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast';
import { redirect, useRouter } from 'next/navigation'
import { Context } from '@/components/Clients';

const AddTodoForm = () => {

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const { user } = useContext(Context)

  const router = useRouter()

  const taskHandler = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch("/api/newTask", {
        method: "POST",
        body: JSON.stringify({
          title, description
        }),
        headers: {
          "Content-Type": "application/json"
        }
      })
      const data = await res.json()
      if (!data.success) return toast.error(data.message)
      toast.success(data.message)
      router.refresh()
      setTitle("")
      setDescription("")
    } catch (err) {
      return toast.error(err.message)
    }
  }
  if (!user._id) return redirect("/login")
  
  return (
    <div className="login">
      <section>
        <form onSubmit={taskHandler}>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Task Title' style={{ color: 'black' }} />

          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Task Description' style={{ color: 'black' }} />

          <button type='submit'>Add Task</button>

        </form>
      </section>
    </div>
  )
}

export default AddTodoForm