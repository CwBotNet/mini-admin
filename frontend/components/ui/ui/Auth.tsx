"use client"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { BACKEND_URL } from "@/config"
import axios from "axios"
import Cookies from "js-cookie"


export function Auth({ type }: {
    type: "signin" | "signup"
}) {
    const router = useRouter();

    const [userInputs, setUserInputs] = useState({
        name: "",
        email: "",
        password: ""
    })


    const sendRequest = async () => {
        try {
            const response = await axios.post(`${BACKEND_URL}/user/${type === "signup" ? "signup" : "signin"}`, userInputs);
            const jwt = await response.data;
            Cookies.set("token", jwt, { secure: true, expires: 3 })
            return router.push("/admin");

        } catch (e) {
            console.log(e)
        }
    }

    return (
        <Card className="mx-auto max-w-sm">
            <CardHeader>
                <CardTitle className="text-2xl">{type === "signin" ? "Sign In" : "Sign Up"}</CardTitle>
                <CardDescription>
                    Enter your email below to {type === "signin" ? "signin" : "signup"} to your account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        {
                            type === "signup" ? <>
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="text"
                                    type="text"
                                    placeholder="john"
                                    required
                                    onChange={(e) => setUserInputs({ ...userInputs, name: e.target.value })}
                                />
                            </>
                                :
                                null
                        }
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            required
                            onChange={(e) => setUserInputs({ ...userInputs, email: e.target.value })}
                        />
                    </div>
                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="password">Password</Label>
                        </div>
                        <Input id="password" type="password" required onChange={(e) => setUserInputs({ ...userInputs, password: e.target.value })} />
                    </div>
                    <Button type="submit" className="w-full" onClick={sendRequest}>
                        {type === "signin" ? "Sign in" : "Sign up"}
                    </Button>
                </div>
                <div className="mt-4 text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <Link href={type === "signin" ? "/signup" : "/"} className="underline">
                        {type === "signin" ? "Sign up" : "Sign in"}
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}
