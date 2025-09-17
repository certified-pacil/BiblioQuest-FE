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
import { BACKEND_URL } from "@/config"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export function RegisterCard()
{
    const navigate = useNavigate();
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    async function createUser(e: React.FormEvent)
    {
        console.log("clicked")
        e.preventDefault();
        try {
            const body = JSON.stringify({
                username,
                email,
                password,
                confirmPassword,
                })
            console.log(body)
            const res = await fetch(BACKEND_URL + "/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            
            body: body,
            })
            if (res.ok)
            {
                navigate('/login')
                const data = await res.json()
                console.log("Response:", data)
            }
        } catch (err) {
            console.error("Error:", err)
        }
    }
    
    return (
        <Card className="w-153">
            <CardHeader>
                <CardTitle>
                    <p className="text-s3 font-bold text-blue-500"> Join Us Today!</p>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={createUser}>
                    <div className="flex flex-col gap-13 text-s5 text-blue-700">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="fullName">Full Name</Label>
                            <Input id="fullName" placeholder="Type here" value={username} onChange={(e) => setUsername(e.target.value)} required></Input>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="Type here" value={email} onChange={(e) => setEmail(e.target.value)} required></Input>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" placeholder="Type here" value={password} onChange={(e) => setPassword(e.target.value)} required></Input>
                            <p className="text-s6">should contains 8 char with a combination of uppercase letters, lowercase letters, numbers, and special symbols</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <Input id="confirmPassword" type="password" placeholder="Type here" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required></Input>
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
                <Button type="submit" className="w-full bg-orange-500 hover:cursor-pointer" onClick={createUser}>Sign Up</Button>
                    <div className="flex flex-row gap-1">
                        <p>Already have an account?</p>
                        <a href="/login" className="underline">Sign in</a>
                    </div>
            </CardFooter>
            
        </Card>
    );
}