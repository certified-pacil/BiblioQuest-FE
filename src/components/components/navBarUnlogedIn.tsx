import { Input } from "../ui/input";
import bqWhite from "../../assets/bq-white.png";
import Search from "../../assets/search.png";
import { Button } from "../ui/button";

export function NavBarUnlogedIn()
{
    return (
        <div className="flex flex-col lg:flex-row w-full py-2 lg:py-3 bg-blue-500 text-white gap-3 lg:gap-15 items-center justify-center font-montserrat">
            <div className="flex flex-row gap-4 lg:gap-15">
                <img src={bqWhite} alt="logo" className="size-10 translate-y-1"/>
                <div className="relative flex flex-row w-80 lg:w-200 items-center">
                    <Input type="text" className="text-s6 w-full h-10 text-black" placeholder="Type book title, author, or any keywords"/>
                    <img src={Search} alt="search" className="absolute z-1 right-2"/>
                </div>
                <div className="flex flex-row gap-4">
                    <Button className="bg-blue-400 font-bold"><a href="/login" className="w-full">Sign In</a></Button>
                    <Button className="bg-orange-500 font-bold"><a href="/register" className="w-full">Sign Up</a></Button>
                </div>
            </div>
        </div>
    )
}