"use client"
import {  useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera, User } from "lucide-react"
import { editSpaceDetails } from '@/actions/spaceActions'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { getSpaceById } from '@/actions/spaceActions'
function EditProfileSection({ spaceId }) {
    
    const [name, setName] = useState("")
    const [description,setDescription]=useState("")
    const [avatarImage, setAvatarImage] = useState("")
    const [bannerImage, setBannerImage] = useState("")

const router =useRouter()
    useEffect(() => {
        const getSpaceData = async () => {
            try {
                const result = await getSpaceById(spaceId);
                if (result) {
                    setName(result.data.name || "");
                    setDescription(result.data.description || "");
                }
            } catch (error) {
                console.error("Error fetching space data:", error);
            }
        };
        getSpaceData();
    }, []);
   
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await editSpaceDetails(spaceId, name, description, avatarImage, bannerImage);
            if (result) {
                toast.success(result.message)
                router.refresh()
            } else {
                toast.error(result.message)
            }
        } catch (error) {
            toast.error("Error in edit space details ",error)
        }
        finally {
            setName("")
            setDescription("");
            setAvatarImage("");
            setBannerImage("")
        }
    }
    const handleAvatarChange = (event) => {
        const file = event.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setAvatarImage(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleBannerChange = (event) => {
        const file = event.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setBannerImage(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Edit Profile</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px] max-h-[90vh] overflow-auto">
                <DialogHeader className="relative">
                    <DialogTitle>Edit Your Profile</DialogTitle>
                    <DialogDescription>Make changes to your profile here. Click save when you're done.</DialogDescription>
                </DialogHeader>
                <Separator className="my-4" />
                <div className="space-y-8">
                    <div className="space-y-4">
                        <div className="flex flex-col items-center space-y-4">
                            <Avatar className="w-20 h-20">
                                <AvatarImage src={avatarImage} />
                                <AvatarFallback>
                                    <User className="w-8 h-8" />
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <label htmlFor="profileImage" className="cursor-pointer">
                                    <div className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary">
                                        <Camera className="w-4 h-4" />
                                        <span>Change avatar</span>
                                    </div>
                                </label>
                                <Input
                                    id="profileImage"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleAvatarChange}
                                />
                            </div>
                        </div>

                        {/* Banner Image Section */}
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md relative">
                            <div className="absolute inset-0">
                                {/* Banner image as background */}
                                {bannerImage && (
                                    <div
                                        className="w-full h-full bg-cover bg-center"
                                        style={{ backgroundImage: `url(${bannerImage})` }}
                                    ></div>
                                )}
                            </div>
                            <div className="space-y-1 text-center">
                                <Camera className="mx-auto h-12 w-12 text-muted-foreground" />

                                <div className="flex text-sm text-muted-foreground">
                                    <label
                                        htmlFor="bannerImage"
                                        className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary/90 "
                                    >
                                        <span>Upload a file</span>
                                        <Input
                                            id="bannerImage"
                                            type="file"
                                            accept="image/*"
                                            className="sr-only"
                                            onChange={handleBannerChange}
                                        />
                                    </label>
                                    <p className="pl-1">or drag and drop</p>
                                </div>

                                <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
                            </div>

                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" placeholder="Enter your name" value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                placeholder="Tell us about yourself"
                                className="min-h-[100px] resize-none"
                                value={description}
                                onChange={(e)=>setDescription(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <DialogFooter className="mt-6">
                    <Button type="submit" className="w-full" onClick={handleSubmit}>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default EditProfileSection
