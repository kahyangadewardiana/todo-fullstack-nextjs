"use client"

import React, { useState } from "react"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState ("")
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("")

        const {error} = await authClient.signIn.email ({
            email,
            password,
        })

        if (error) {
            setError(error.message)
        } else {
            router.push("/")
            router.refresh()
        }
    }

    return(
        <div className="max-w-md mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Masuk</h1>

            {error && <p>{error}</p>}

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input 
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail (e.target.value)}
                    className="border p-2 rounded"
                />

                <input 
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword (e.target.value)}
                    className="border p-2 rounded"
                />

                <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
                    Masuk
                </button>
            </form>
        </div>
    )
}