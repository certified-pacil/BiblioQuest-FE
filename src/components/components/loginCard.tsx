import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { BACKEND_URL } from "@/config"
import { useNavigate } from "react-router-dom"

export function LoginCard()
{
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function loginUser(e: React.FormEvent)
    {
        e.preventDefault();
        try {
            const res = await fetch(BACKEND_URL+"/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                    }),
                credentials: "include",
                })
            if (res.ok)
            {
                await res.json();
                navigate('/')
            }
        } catch (err) {
            console.error("Error:", err)
        }
    }

    return (
        <Card className="w-153">
            <CardHeader>
                <CardTitle>
                    <p className="text-s3 font-bold text-blue-500">Welcome Back!</p>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={loginUser}>
                    <div className="flex flex-col gap-13 text-s5 text-blue-700">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="Type here" value={email} onChange={(e) => setEmail(e.target.value)} required></Input>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" placeholder="Type here" value={password} onChange={(e) => setPassword(e.target.value)} required></Input>
                            <p className="text-s6">should contains 8 char with a combination of uppercase letters, lowercase letters, numbers, and special symbols</p>
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
                <Button type="submit" className="w-full bg-orange-500 hover:cursor-pointer" onClick={loginUser}>Sign In</Button>
                <div className="flex flex-row gap-1">
                    <p>Already have an account?</p>
                    <a href="/register" className="underline">Sign Up</a>
                </div>
            </CardFooter>
        </Card>
    )
}