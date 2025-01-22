"use client"
import React from 'react'

import { useRouter } from 'next/navigation';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Pencil } from "lucide-react";
import toast from 'react-hot-toast';
import { Button } from './ui/button'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from 'react'
import { saveChangesOfProfile } from '@/actions/userActions'


function EditDialog({ username }) {
    const router = useRouter();
     const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [website, setWebsite] = useState("");
    const [location, setLocation] = useState("");
    const handleSaveChanges = async () => {
        try {
            const result = await saveChangesOfProfile({ name, bio, location, username, website });
            if (result.success) {
                toast.success(result.message)
            } else {
                toast.error(result.message)
            }
        } catch (error) {
            console.log("error while updating the user profile in edit dialog comp")
        } finally {
            setBio("");
            setName("");
            setWebsite("");
            setLocation("");
            router.push(window.location.pathname);
   
        }
        
        
    }
  return (
    <div>
          <Dialog>
              <DialogTrigger asChild>
                  <Button size="sm" variant="default" className="flex items-center space-x-2"  >
                      <Pencil className="w-4 h-4" />
                      <span>Edit Profile</span>
                  </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                      <DialogTitle>Edit profile</DialogTitle>
                      <DialogDescription>
                          Make changes to your profile here. Click save when you're done.
                      </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">
                              Name
                          </Label>
                          <Input
                              id="name"
                              placeholder="e.g., John Doe"
                              value={name}

                              onChange={(e) => setName(e.target.value)}
                              className="col-span-3"
                          />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="bio" className="text-right">
                              Bio
                          </Label>
                          <Input
                              id="bio"
                              value={bio}
                              onChange={(e) => setBio(e.target.value)}
                              placeholder="e.g., A passionate developer"
                              className="col-span-3"
                          />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="location" className="text-right">
                              location
                          </Label>
                          <Input
                              id="location"
                              value={location}
                              onChange={(e) => setLocation(e.target.value)}
                              placeholder="e.g., San Francisco, CA"
                              className="col-span-3"
                          />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="website" className="text-right">
                              website
                          </Label>
                          <Input
                              id="website"
                              value={website}
                              onChange={(e) => setWebsite(e.target.value)}
                              placeholder="e.g., www.johndoe.com"
                              className="col-span-3"
                          />
                      </div>
                  </div>
                  <DialogFooter>
                      <Button type="submit" onClick={() => handleSaveChanges()}>  Save changes</Button>
                  </DialogFooter>
              </DialogContent>
          </Dialog>
    </div>
  )
}

export default EditDialog
