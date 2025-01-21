import React from 'react'
import DesktopNavbar from './DesktopNavbar'
import MobileNavbar from './MobileNavbar'
import Link from 'next/link'
import { currentUser } from '@clerk/nextjs/server'
import { syncAction } from '@/actions/userActions'
async function Navbar() {
    const user = await currentUser()
    console.log("In the navbar")
    if (user) {
        const result = await syncAction();
        if (result.success) {
            console.log("user in table")
        }
        console.log(result.message)
    }
    return (
        <div className='sticky top-0 border-b  '>
            <div className='flex justify-around h-16 items-center '>

                <div className='flex items-center'>
                    <Link href={"/"} className=' text-xl lg:text-2xl font-mono tracking-tighter text-primary font-bold '>hiveMind</Link>
                </div>
                <div className='flex items-center'>
                    <DesktopNavbar />
                    <MobileNavbar />
                </div>
            </div>


        </div>
    )
}

export default Navbar