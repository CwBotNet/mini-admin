"use client"

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '../button'
import { cookies } from "next/headers"
import { useRouter } from 'next/navigation'
import { logOut } from "@/helper"
import axios from "axios"
import { BACKEND_URL } from "@/config"

const UserMenu = () => {

    const router = useRouter()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="overflow-hidden rounded-full"
                >
                    U
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={async () => {
                    axios.get(`${BACKEND_URL}/admin/logout`, { withCredentials: true }).then(() => {
                        router.push("/")
                    })
                }}>Logout</DropdownMenuItem >
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserMenu
