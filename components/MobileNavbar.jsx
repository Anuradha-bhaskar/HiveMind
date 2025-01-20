import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { LogOut } from 'lucide-react';
import { SignedIn, SignInButton, SignOutButton,SignUpButton } from "@clerk/nextjs";
import { CircleUser, Bell, Home } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';
import { Menu } from 'lucide-react';
import { currentUser } from '@clerk/nextjs/server';
import { UsersRound } from 'lucide-react';
import { SquarePen } from 'lucide-react';

async function MobileNavbar() {
    const user = await currentUser();
    return (
        <div className=' md:hidden flex  gap-x-2 '>

            <Sheet>
                <SheetTrigger><Menu /></SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Menu</SheetTitle>
                        <SheetDescription>
                            {user ? <div className='flex flex-col items-start px- gap-y-2'>
                                <Link href={"/"}>
                                    <Button variant={"ghost"}>
                                        <Home />
                                        Home
                                    </Button>
                                </Link>
                                <Link href={"/notification"}>
                                    <Button variant={"ghost"}>
                                        <UsersRound />
                                        Spaces
                                    </Button>
                                </Link>
                                <Link href={"/notification"}>
                                    <Button variant={"ghost"}>
                                        <SquarePen />
                                        Write
                                    </Button>
                                </Link>
                                <Link href={"/notification"}>
                                    <Button variant={"ghost"}>
                                        <Bell />
                                        Notifications
                                    </Button>
                                </Link>
                                <Link href={"/"}>
                                    <Button variant={"ghost"}>
                                        <CircleUser />
                                        Profile
                                    </Button>
                                </Link>
                                <SignedIn>
                                    <SignOutButton >
                                        <Button>
                                            <LogOut />
                                            Sign Out
                                        </Button>
                                    </SignOutButton>
                                </SignedIn>
                            </div> : <div className='flex flex-col items-start px- gap-y-2'>
                                <Link href={"/"}>
                                    <Button variant={"ghost"}>
                                        <Home />
                                        Home
                                    </Button>
                                </Link>
                                    <SignInButton mode="modal">
                                        <Button className="px-8">
                                            LogIn 
                                        </Button>
                                    </SignInButton>
                                    <SignUpButton mode="modal">
                                        <Button >
                                            SignUp
                                        </Button>
                                    </SignUpButton>
                            </div>}
                        </SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </div>
    )
}

export default MobileNavbar