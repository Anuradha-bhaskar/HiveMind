import { PlusCircle, Compass } from "lucide-react"
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
import { Textarea } from "../ui/textarea"

const SpaceHeader = () => {
    return (
        <div className="relative w-full bg-gradient-to-r from-[#1e40af] to-[#1e3a8a] overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative min-h-[200px] py-8 sm:py-12 flex items-center">
                    {/* Content Container */}
                    <div className="flex-1 z-10">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-2 sm:mb-4">
                            Welcome to Spaces
                        </h1>
                        <p className="text-indigo-100 text-base sm:text-lg mb-6 max-w-xl">
                            Follow spaces to explore your interests on Hivemind
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-white text-[#1e40af] font-sans hover:bg-indigo-50 hover:scale-105 transition-all duration-300">
                                        <PlusCircle className="w-5 h-5 mr-2" />
                                        Create a Space
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle>Create a Space</DialogTitle>
                                        <DialogDescription>
                                            Define your space with a title and a brief description.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="space-title" className="text-right">
                                                Title
                                            </Label>
                                            <Input id="space-title" placeholder="Enter space title" className="col-span-3" />
                                        </div>
                                        <div className="grid grid-cols-4 items-start gap-4">
                                            <Label htmlFor="space-desc" className="text-right mt-2">
                                                Description
                                            </Label>
                                            <Textarea id="space-desc" placeholder="Enter a brief description..." className="col-span-3 resize-none h-24" />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button type="submit">Create Space</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>

                           
                            <Button className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-[#1e40af] text-white font-sans  hover:bg-[#1e3a8a] hover:scale-105 transition-all duration-300 border border-white">
                                <Compass className="w-5 h-5 mr-2" />
                                Discover Spaces
                            </Button>
                        </div>
                    </div>

                    {/* Decorative Image */}
                    <div className="hidden md:block absolute right-0 top-0 h-full w-1/3">
                        <img
                            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=500"
                            alt="Space decoration"
                            className="h-full w-full object-cover opacity-50"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#1e40af]/90 to-transparent" />
                    </div>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-white rounded-full mix-blend-overlay filter blur-xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/3 w-32 h-32 bg-purple-300 rounded-full mix-blend-overlay filter blur-lg animate-pulse delay-700" />
            </div>
        </div>
    )
}

export default SpaceHeader

