"use client";
import { getSpaceById } from "@/actions/spaceActions";
import AboutPage from "@/components/space/AboutPage";
import { useState, useEffect } from "react";

function Page({ params }) {
  const [title, setTitle] = useState("");
  const [selected, setSelected] = useState("Questions");
  const [space,setSpace] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { title } = await params;
      setTitle(title);
    }
    fetchData();
  }, [params]);

  useEffect(() => {
    const fetchData = async () => {
setLoading(true);
      const result = await getSpaceById(title);
      if (result.success) {
        setSpace(result.data);
      } else {
        setSpace(null);
      }
    setLoading(false);
    };
    fetchData();
}, [title]);

  if (loading) {
    return (
      <div className="flex mt-32 justify-center h-screen bg-white">
        <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!space) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-gray-600">
        <p className="text-lg font-semibold">Nothing here</p>
      </div>
    );
  }
  
  return (
    <div>

      {/* Navigation Buttons */}
      <div className="flex border-b border-gray-300">
        {["Questions", "About"].map((tab) => (
          <button
            key={tab}
            onClick={() => setSelected(tab)}
            className={`px-4 py-2 text-black text-sm font-medium bg-white focus:outline-none ${selected === tab
              ? "underline underline-offset-8 decoration-2 decoration-black"
              : "hover:underline-offset-1"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Conditionally Render Content */}
      <div className="mt-4">
        {selected === "Questions" && <div>Posts Content</div>}
        {selected === "About" && <AboutPage space={space} />}
      </div>
    </div>
  );
}

export default Page;
