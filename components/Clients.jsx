"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast"
import { useRouter } from "next/navigation";

export const Context = createContext({ user: {} });

export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState({});

    useEffect(() => {
        fetch("/api/auth/me")
            .then((res) => res.json())
            .then((data) => {
                if (data.success) setUser(data.user)
            })
    }, [])

    return (
        <Context.Provider
            value={{
                user,
                setUser,
            }}
        >
            {children}
            <Toaster />
        </Context.Provider>
    );
};

export const LogoutBtn = () => {
    const { user, setUser } = useContext(Context);

    const logoutHandler = async () => {
        try {
            const res = await fetch("/api/auth/logout")
            const data = await res.json()
            if (!data.success) return toast.error(data.message)
            setUser({})
            toast.success(data.message)
        } catch (err) {
            return toast.error(err.message)
        }
    }
    return user._id ? <button className="btn" onClick={logoutHandler}>Logout</button> : <Link href={"/login"}>Login</Link>

}

export const TodoButton = ({ id, completed }) => {
    const router = useRouter()

    const deleteHandler = async (id) => {
        try {
            const res = await fetch(`/api/task/${id}`,
                {
                    method: "DELETE"
                }
            )
            const data = await res.json()
            if (!data.success) return toast.error(data.message)

            toast.success(data.message)
            router.refresh()
        } catch (err) {
            return toast.error(err.message)
        }
    }

    const updateHandler = async (id) => {
        try {
            const res = await fetch(`/api/task/${id}`,
                {
                    method: "PUT"
                }
            )
            const data = await res.json()
            if (!data.success) return toast.error(data.message)

            toast.success(data.message)
            router.refresh()
        } catch (err) {
            return toast.error(err.message)
        }
    }


    return <>
        <input type="checkbox" checked={completed} onChange={() => updateHandler(id)} />
        <button className="btn" onClick={() => deleteHandler(id)}>Delete</button>
    </>
}