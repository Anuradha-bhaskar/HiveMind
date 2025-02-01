import HeroSection from "@/components/HeroSection"
import MainBlog from "@/components/MainBlog"
import BlogSideSection from "@/components/BlogSideSection"

export default async function Home() {
  return (
    <div className="container mx-auto bg-white">
      <HeroSection />
      <div className="flex flex-col md:flex-row">
        <div className="md:w-[5%] pr-4">
          
        </div>
        <div className="md:w-[60%] ">
          <MainBlog />
        </div>
        <div className="md:w-[40%] mt-8 md:-ml-24 md:mt-0">
          <BlogSideSection />
        </div>

      </div>
    </div>
  )
}


