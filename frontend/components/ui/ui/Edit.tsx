"use client"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PlusCircle } from "lucide-react"
import { useState } from "react"
import { BACKEND_URL } from "@/config"
import axios from "axios"
import cookies from "js-cookie"
import { useRouter } from "next/navigation"


interface Props {
    type: string,
    btnVariant?: string | any,
    item?: {
        id?: string,
        name?: string,
        email?: string,
        role?: string
    }
}

export default function Edit(
    { type, btnVariant, item }: Props) {
    const [userInput, setUserInput] = useState({
        id: item?.id || "",
        name: item?.name || "",
        email: item?.email || "",
        role: item?.role || ""
    })
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const sendRequest = async () => {
        try {

            if (type === "Add") {
                setLoading(true)
                const response = await axios.post(`${BACKEND_URL}/admin/miniadmin`, userInput, {
                    withCredentials: true,
                    headers: {
                        'Accept': '*/*',
                        'Authorization': `${cookies.get("token")}`,
                        "cookie": `token=${cookies.get("token")}`
                    }
                });
                setLoading(false)
                router.refresh()
                return response.data.data
            }
            setLoading(true)
            const response = await axios.put(`${BACKEND_URL}/admin/miniadmin/${item?.id}`, userInput, {
                withCredentials: true,
                headers: {
                    'Accept': '*/*',
                    'Authorization': `${cookies.get("token")}`,
                    "cookie": `token=${cookies.get("token")}`
                }
            });
            setLoading(false)
            router.refresh()
            return response.data.data

        } catch (e: any) {
            console.log(e.message)
            return e.message
        }

    }

    // console.log(cookies.get("token"))


    return (
        <Dialog  >
            <DialogTrigger asChild>

                <Button variant={btnVariant || "ghost"} size={type === "Add" ? "sm" : "lg"}>
                    {type === "Add" ?
                        <PlusCircle className="h-3.5 w-3.5 mr-2" />
                        : null
                    }
                    {type === "Edit" ? "Edit" : "Add"} Role</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        {type === "Edit" ? "Edit your profile here. Click save when you're done." : "Add a new role here. Click save when you're done."}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input id="name" placeholder={"john doe"} className="col-span-3" value={item?.name} onChange={(e) => setUserInput({ ...userInput, name: e.target.value })} />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">
                            email
                        </Label>
                        <Input id="email" placeholder={"xyz@gmail.com"} value={item?.email} className="col-span-3" onChange={(e) => setUserInput({ ...userInput, email: e.target.value })} />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="role" className="text-right">
                            role
                        </Label>
                        <Select onValueChange={(value: string) => {
                            setUserInput({
                                ...userInput,
                                role: value
                            })
                        }}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder={item?.role || "Select a role"} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="miniadmin Master">miniadmin Master</SelectItem>
                                    <SelectItem value="Master Master">Master Master</SelectItem>
                                    <SelectItem value="Super Agent Master">Super Agent Master</SelectItem>
                                    <SelectItem value="Agent Master">Agent Master</SelectItem>
                                    <SelectItem value="Client Master">Client Master</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <DialogFooter>

                    {
                        loading ? <Button variant={"default"}>{type === "Add" ? "Adding..." : "Updating..."}</Button> :
                            <DialogTrigger>
                                <Button type="submit" onClick={sendRequest}>
                                    {type === "Edit" ? "Save changes" : "Add Role"}
                                </Button>
                            </DialogTrigger>
                    }
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
