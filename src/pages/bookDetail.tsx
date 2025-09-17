import { useEffect, useState } from "react"
import { BACKEND_URL } from "@/config"
import { useParams } from "react-router-dom";
import { NavBarLogedIn } from "../components/components/navBarLogedIn";
import profilePic from "../assets/profilePic.jpg";


interface Book {
    id: number,
    addedByAdminId: number,
    title: string,
    author: string,
    publisher: string,
    publicationYear: number,
    category: string,
    price: number,
    coins: number,
    addedAt: Date,
    preview?: string
    status: string,
}


export function BookDetail()
{
    const [book, setBook] = useState<Book>();
    const { id } = useParams();
    useEffect(() => {
        console.log(BACKEND_URL+`/book/${id}`)
        fetch(BACKEND_URL+`/book/${id}`, {
            method: 'GET',
            credentials: 'include',
        })
        .then((res) => {
            if (!res.ok) throw new Error("Failed to fecth book.")
            return res.json()
        })
        .then((result) => setBook(result.book))
        .catch(console.error)
    }, [])

    console.log(book)
    
    return (
        <div className="flex flex-col w-full">
            <NavBarLogedIn username="Dion" coins={100} profilePic={profilePic} location="Book Store"/>
        </div>
    )
}