import authIcon from "../assets/authIcon.png";
import { LoginCard } from "@/components/components/loginCard";

export function Login()
{
    return (
        <div className="flex flex-row gap-8 xl:w-6xl 2xl:w-7xl justify-center items-center h-screen">
            <div className="relative flex flex-col gap-3 items-center translate-y-10">
                <p className="absolute flex z-1 w-100 text-s1 text-blue-500 font-bold top-0">Hi, Ready to Find Your Next Favorite Book?</p>
                <img src={authIcon} alt="icon" className="w-177"/>
            </div>
            <LoginCard />
        </div>
    );
}