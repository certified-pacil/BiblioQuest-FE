import bookGroup from "../assets/bookGroup.png";
import Coin from "../assets/coin.png";
import newBook from "../assets/newbook.png";
import discount from "../assets/discount.png";
import preorder from "../assets/preorder.png";
import profilePic from "../assets/profilePic.jpg";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "@/config";
import { Button } from "@/components/ui/button";
import { NavBarLogedIn } from "@/components/components/navBarLogedIn.tsx";
import { NavBarUnlogedIn } from "@/components/components/navBarUNlogedIn";

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

export function Catalogue()
{
    const [popularBooks, setPopularBooks] = useState<Book[]>([])
    useEffect(() => {
        fetch(BACKEND_URL+"/book?status=popular", {
            method: 'GET'
        })
        .then((res) => {
            if (!res.ok) throw new Error("Failed to fetch books.");
            return res.json();
        })
        .then((result) => {
            console.log("result: "+result)
            setPopularBooks(result.books)
        }).catch(console.error);
    }, []);

    const [recommendedBooks, setRecommendedBooks] = useState<Book[]>([])
    useEffect(() => {
        fetch(BACKEND_URL+"?status=recommended")
        .then((res) => {
            if (!res.ok) throw new Error("Failed to fetch books.");
            return res.json();
        })
        .then((result) => setRecommendedBooks(result.books)).catch(console.error);
    }, []);

    const [alwaysRelatedBooks, setAlwaysRelatedBooks] = useState<Book[]>([])
    useEffect(() => {
        fetch(BACKEND_URL+"?status=alwaysRelated")
        .then((res) => {
            if (!res.ok) throw new Error("Failed to fetch books.");
            return res.json();
        })
        .then((result) => setAlwaysRelatedBooks(result.books)).catch(console.error);
    }, []);

    const specials = [
        {
            icon: newBook,
            title: "New Books",
            width: 152,
            gap: 20,
            href: "/",
        },
        {
            icon: discount,
            title: "Discounted",
            width: 22*4,
            gap: 5,
            href: "/",
        },
        {
            icon: preorder,
            title: "Pre-Order",
            width: 120,
            gap: 0,
            href: "/",
        }
    ];

    const formatter = new Intl.NumberFormat('id-ID');

    return (
        <div className="flex flex-col xl:w-7xl 2xl:w-full items-center">
            {
                localStorage.getItem('token') ? 
                <NavBarLogedIn username="Dion" coins={100} profilePic={profilePic} location="Book Store"/> :
                <NavBarUnlogedIn />
            }
            <div className="relative flex flex-row xl:w-6xl 2xl:w-7xl h-75 gap-40 bg-gradient-to-r from-orange-600 to-[#FFC29B] rounded-2xl px-10 items-center overflow-hidden my-10">
                <img src={bookGroup} alt="" />
                <div className="flex flex-col w-[667px] text-s2 font-bold text-white">
                    <p className="w-full">Read your favorite books, prove your</p>
                    <div className="flex flex-row w-full gap-2">
                        <p>knowledge, and unlock</p>
                        <p className="text-orange-500">ReadCoin</p>
                        <p>as you</p>
                    </div>
                    <p>grow your library.</p>
                </div>
                <img src={Coin} alt="coin" className="absolute size-44 z-1 right-0 top-0 translate-x-21 -translate-y-7"/>
                <img src={Coin} alt="coin" className="absolute size-29 z-1 right-150 top-0 -translate-y-11"/>
                <img src={Coin} alt="coin" className="absolute size-21 z-1 right-50 top-0 -translate-y-10"/>
                <img src={Coin} alt="coin" className="absolute size-29 z-2 right-1 bottom-0 translate-y-4"/>
                <img src={Coin} alt="coin" className="absolute size-21 z-1 right-100 bottom-5 "/>
                <img src={Coin} alt="coin" className="absolute size-18 z-1 right-150 bottom-0 translate-y-8"/>
            </div>
            <div className="flex flex-row gap-10 mb-20">
                {
                    specials.map((special) => (
                        <Card className="flex w-46 h-40">
                            <a href={special.href} className="flex flex-col w-full h-full items-center justify-center" style={{
                                gap: special.gap
                            }}>
                                <img src={special.icon} alt="" style={{
                                    width: special.width,
                                }}/>
                                <p className="text-s5 text-blue-700">{special.title}</p>
                            </a>
                        </Card>
                    ))
                }
            </div>
            <div className="flex flex-col xl:w-6xl 2xl:w-7xl gap-10 mb-20">
                <div className="relative flex flex-row w-full items-center">
                    <p className="absolute left-0 text-blue-700 font-bold text-s2">Popular</p>
                    <a href="/" className="absolute right-0 text-blue-500 font-bold text-s5">See More</a>
                </div>
                <div className="flex flex-row xl:gap-5 2xl:gap-10">
                    {
                        popularBooks.map((popularBook) => (
                            <a href={`/books/${popularBook.id}`}>
                                <Card className="relative flex flex-col w-71 h-121 overflow-hidden">
                                    <img src={`/covers/${popularBook.title.toLowerCase().replace(' ','-')}.png`} alt={popularBook.title} className="size-77 object-cover"/>
                                    <Card className="absolute flex flex-col w-full bottom-0 px-5 py-5">
                                        <p className="font-bold text-s4">{popularBook.title}</p>
                                        <p className="mb-3">{popularBook.author}</p>
                                        <p className="text-s3 text-orange-400 font-bold mb-1">IDR{formatter.format(popularBook.price)}</p>
                                        <Button className="flex bg-orange-600 h-12">
                                            <a href={`/books/${popularBook.id}`} className="flex flex-row size-full text-center justify-center items-center">
                                                <p>Buy Now</p>
                                            </a>
                                        </Button>
                                    </Card>
                                </Card>
                            </a>
                        ))
                    }
                </div>
            </div>
            <div className="flex flex-col xl:w-6xl 2xl:w-7xl gap-10">
                <div className="relative flex flex-row w-full items-center">
                    <p className="absolute left-0 text-blue-700 font-bold text-s2">Biblio Recommendation</p>
                    <a href="/" className="absolute right-0 text-blue-500 font-bold text-s5">See More</a>
                </div>
                <div className="flex flex-row xl:gap-5 2xl:gap-10">
                    {
                        recommendedBooks.map((recommendedBook) => (
                            <Card className="relative flex flex-col w-71 h-121 overflow-hidden">
                                <img src={`/covers/${recommendedBook.title.toLowerCase().replace(' ','-')}.png`} alt={recommendedBook.title} className="size-77 object-cover"/>
                                <Card className="absolute flex flex-col w-full bottom-0 px-5 py-5">
                                    <p className="font-bold text-s4">{recommendedBook.title}</p>
                                    <p className="mb-3">{recommendedBook.author}</p>
                                    <p className="text-s3 text-orange-400 font-bold mb-1">IDR{formatter.format(recommendedBook.price)}</p>
                                    <Button className="flex bg-orange-600 h-12">
                                        <a href={`/books/${recommendedBook.id}`} className="flex flex-row size-full text-center justify-center items-center">
                                            <p>Buy Now</p>
                                        </a>
                                    </Button>
                                </Card>
                            </Card>
                        ))
                    }
                </div>
            </div>
            <div className="flex flex-col xl:w-6xl 2xl:w-7xl gap-10">
                <div className="relative flex flex-row w-full items-center">
                    <p className="absolute left-0 text-blue-700 font-bold text-s2">Always Related</p>
                    <a href="/" className="absolute right-0 text-blue-500 font-bold text-s5">See More</a>
                </div>
                <div className="flex flex-row xl:gap-5 2xl:gap-10">
                    {
                        alwaysRelatedBooks.map((alwaysRelatedBook) => (
                            <Card className="relative flex flex-col w-71 h-121 overflow-hidden">
                                <img src={`/covers/${alwaysRelatedBook.title.toLowerCase().replace(' ','-')}.png`} alt={alwaysRelatedBook.title} className="size-77 object-cover"/>
                                <Card className="absolute flex flex-col w-full bottom-0 px-5 py-5">
                                    <p className="font-bold text-s4">{alwaysRelatedBook.title}</p>
                                    <p className="mb-3">{alwaysRelatedBook.author}</p>
                                    <p className="text-s3 text-orange-400 font-bold mb-1">IDR{formatter.format(alwaysRelatedBook.price)}</p>
                                    <Button className="flex bg-orange-600 h-12">
                                        <a href={`/books/${alwaysRelatedBook.id}`} className="flex flex-row size-full text-center justify-center items-center">
                                            <p>Buy Now</p>
                                        </a>
                                    </Button>
                                </Card>
                            </Card>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}