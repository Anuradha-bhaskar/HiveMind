import HeroSection from "@/components/HeroSection"
import MainBlog from "@/components/MainBlog"
import BlogSideSection from "@/components/BlogSideSection"

export default async function Home() {
  return (
    <div className="container mx-auto bg-white">
      <HeroSection />
      <div className="flex flex-col md:flex-row mt-8">
        <div className="md:w-[70%] pr-4">
          <MainBlog />
        </div>
        <div className="md:w-[30%] mt-8 md:mt-0">
          <BlogSideSection />
        </div>
      </div>
    </div>
  )
}


