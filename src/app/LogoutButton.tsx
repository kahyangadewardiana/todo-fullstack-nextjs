"use client"

import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"

export default function LogoutButton() {
    const router = useRouter();

    const handleLogout = async () => {
        await authClient.signOut();
        router.push("/login");
        router.refresh()
    }

    return(
        <button onClick={handleLogout} className="text-sm hover:text-red-300">
            Logout
        </button>
    )
}