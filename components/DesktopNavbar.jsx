import React from 'react'
import Link from 'next/link';
import { CircleUser, Bell, Home } from 'lucide-react';
import { SignedIn, UserButton, SignInButton, SignedOut, SignUpButton } from "@clerk/nextjs";
import { currentUser } from '@clerk/nextjs/server'
import { Button } from './ui/button';
import { UsersRound } from 'lucide-react';


async function DesktopNavbar() {
    const user = await currentUser();
    // console.log("User in desktop navbar", user);
    return (
        <div className='hidden md:block'>
            {
                user ? <div className=' flex gap-x-4'>
                    <Link href={"/"}>
                        <Button variant={"ghost"}>
                            <Home />
                            Home
                        </Button>
                    </Link>
                    <Link href={"/spaces"}>
                        <Button variant={"ghost"}>
                            <UsersRound />
                            Spaces 
                        </Button>
                    </Link>

                
                    <Link href={`/profile/${user.emailAddresses[0].emailAddress.split("@")[0]}`}>
                        <Button variant={"ghost"}>
                            <CircleUser />
                            Profile
                        </Button>
                    </Link>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>


                </div> : <div className=' flex gap-x-4'>
                    
                    <Link href={"/"}>
                        <Button variant={"ghost"}>
                            <Home />
                            Home
                        </Button>
                    </Link>
                        <SignInButton mode="modal">
                            <Button>
                                LogIn
                            </Button>
                        </SignInButton>
                        <SignUpButton mode="modal">
                            <Button>
                                SignUp
                            </Button>
                        </SignUpButton>
                </div>
            }
        </div>
    )
}

export default DesktopNavbar