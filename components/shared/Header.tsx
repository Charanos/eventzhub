"use client";

import Link from "next/link";
import Image from "next/image";
import NavItems from "./NavItems";
import MobileNav from "./MobileNav";
import { Button } from "../ui/button";
import React, { useState, useEffect } from "react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            if (scrollPosition > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <header
            className={`w-full transition-all duration-300 fixed top-0 ${isScrolled
                    ? "bg-white/30 backdrop-blur-xl shadow-lg rounded-full mt-4"
                    : "bg-transparent"
                }`}
        >
            <div className="wrapper flex items-center justify-between">
                <Link href="/" className="w-36">
                    <Image
                        alt="logo"
                        width={128}
                        height={38}
                        src="/assets/images/logo2.svg"
                    />
                </Link>

                <SignedIn>
                    <nav className="md:flex-between hidden w-full max-w-xs">
                        <NavItems />
                    </nav>
                </SignedIn>

                <div className="flex w-32 justify-end items-center gap-3">
                    <SignedIn>
                        <UserButton afterSignOutUrl="/" />
                        <MobileNav />
                    </SignedIn>

                    <SignedOut>
                        <Button asChild className="rounded-full" size="lg">
                            <Link href="/sign-in">Login</Link>
                        </Button>
                    </SignedOut>
                </div>
            </div>
        </header>
    );
};

export default Header;
