import HeroSection from "@/components/HeroSection"
import MainBlog from "@/components/MainBlog"
import BlogSideSection from "@/components/BlogSideSection"
import LoaderBlog
  from "@/components/LoaderBlog"
import SearchComp from "@/components/SearchComp"
  import { Suspense } from "react"
export default async function Home() {
  return (
    <div className="container mx-auto bg-white">
      <HeroSection />
      <div className="flex flex-col md:flex-row">
      
        <div className="md:w-[60%] ">
          <Suspense fallback={<div className="p-6">Loading blogs...</div>}>
            <MainBlog />
          </Suspense>
        </div>


        <div className="md:w-[40%] mt-8 md:-ml-32 md:mt-0">
          <BlogSideSection />
        </div>
      </div>

      <div className="w-full mx-auto text-center">
       <SearchComp/>
        <LoaderBlog/>
      </div>

    </div>
  )
}


