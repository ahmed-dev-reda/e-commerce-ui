
import Image from "next/legacy/image";
import { Input } from "../ui/input";
import { Bell, Home, Search } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import ShoppingCartIcon from "./shopping-cart-icon";


export default function SiteHeader() {

  return (
    <header>
      <nav className="container mx-auto flex justify-between items-center py-4">
        <Link href={"/"} className="flex items-center">
          <Image src={"/logo.png"} alt="Logo" width={25} height={25} />{" "}
          <span className="font-semibold">TRENDLAMA.</span>
        </Link>
        <div className="flex items-center space-x-2">
          <div className="relative items-center hidden sm:flex">
            <Search
              className="absolute top-1/2 -translate-y-1/2 text-gray-500 ml-2"
              size={16}
            />
            <Input
              type="search"
              className="shadow focus-visible:ring-1 indent-5 h-8 text-sm"
              placeholder="Search ....."
            />
          </div>
          <Link href={"/"}>
            <Button variant={"ghost"}>
              <Home size={18} />
            </Button>
          </Link>
          <Button variant={"ghost"}>
            <Bell size={18} />
          </Button>

          <ShoppingCartIcon />
          <Link href={"/auth/login"}>
            <Button>Sign In</Button>
          </Link>
        </div>
      </nav>
    </header>
  );
}
