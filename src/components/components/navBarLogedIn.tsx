import bqWhite from "../../assets/bq-white.png";
import { Input  } from "@/components/ui/input";
import Coin from "../../assets/coin.png";
import Cart from "../../assets/cart.png";
import Search from "../../assets/search.png";

interface NavBarProps {
    username: string,
    coins: number,
    profilePic: string,
    location: string,
}

export function NavBarLogedIn({ username, coins, profilePic, location }: NavBarProps)
{
    const navigations = [
        {
            title: "Book Store",
            href: "/",
        },
        {
            title: "My Library",
            href: "/books",
        },
        {
            title: "Leaderboard",
            href: "/leaderboard",
        }
    ]
    return (
        <div className="flex flex-col lg:flex-row w-full py-2 lg:py-3 bg-blue-500 text-white gap-3 lg:gap-15 items-center justify-center font-montserrat">
            <div className="flex flex-row gap-4 lg:gap-15">
                <img src={bqWhite} alt="logo" className="size-10 translate-y-1"/>
                <div className="relative flex flex-row w-80 lg:w-90 items-center">
                    <Input type="text" className="text-s6 w-full h-10 text-black" placeholder="Type book title, author, or any keywords"/>
                    <img src={Search} alt="search" className="absolute z-1 right-2"/>
                </div>
            </div>
            <div className="flex flex-row gap-4 lg:gap-15 items-center">
                {
                    navigations.map((navigation) => (
                        <a href={navigation.href} className="text-s6 lg:text-s4" style={{
                            color: location == navigation.title ? "#fea481" : "white",
                            fontWeight: location == navigation.title? "bold" : "normal",
                        }}>
                            {navigation.title}
                        </a>
                    ))
                }
                <a href="/cart">
                    <img src={Cart} alt="cart" className="size-10"/>
                </a>
                <div className="flex flex-row gap-4">
                    <div className="flex flex-col">
                        <p className="text-s7 lg:text-s6 font-bold">Hi, {username}!</p>
                        <div className="flex flex-row gap-1 items-center">
                            <p className="text-s6 lg:text-s5">{coins}</p>
                            <img src={Coin} alt="coin" className="size-4 lg:size-5"/>
                        </div>
                    </div>
                    <img src={profilePic} alt="profile" className="size-8 lg:size-10 rounded-full"/>
                </div>
            </div>
        </div>
    )
}