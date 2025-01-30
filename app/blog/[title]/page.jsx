import React from "react";
import BlogHeader from "@/components/BlogHeader";
import AuthorInBlog from "@/components/AuthorInBlog";
import BlogComment from "@/components/BlogComment";
import { getBlogById } from "@/actions/blogAction";
import ImageAndBlog from "@/components/ImageAndBlog";
import CommentSectionBlog from "@/components/CommentSectionBlog";
import { currentUser } from "@clerk/nextjs/server"; // Update this if you're using a different service
import { userByUsername } from "@/actions/userActions";
import { getComments } from "@/actions/blogAction";
import BlogActions from "@/components/BlogActions";


async function page({ params }) {
  const route =await  params.title;
  const arrayOfRoute = route.split("-");
  const blogId = arrayOfRoute[arrayOfRoute.length - 1];
  console.log("Blog id will be: ", blogId);
  // Fetch comments on the server side
  const resultC = await getComments(blogId);
  const comments = resultC.success ? resultC.message : [];

  // Fetch blog data
  const result = await getBlogById(blogId);
  if (!result.success) {
    return <div>No blog found</div>;
  }
  const blogData = result.message;
  const { id, authorId, title, content, image, updatedAt, tags } = blogData;

  // Fetch the current user and resolve their userId
  let userId = null;
  try {
    const user = await currentUser();
    const username = user.emailAddresses[0].emailAddress.split("@")[0];
    const userResult = await userByUsername(username);
    if (userResult.success) {
      userId = userResult.message.id;
    }
  } catch (error) {
    console.error("Error fetching userId:", error);
  }



  const scrollToComment = () => {
    const sectionB = document.getElementById("component-b");
    if (sectionB) {
      sectionB.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-start">
      <div className="w-full max-w-4xl px-4 py-8 bg-white">
        <BlogHeader title={title} tags={tags} dateOfPublished="March 15, 2024" />
        <BlogActions userId={ userId} blogId={blogId} />
        <AuthorInBlog authorId={authorId} userId={userId} />
        
        <ImageAndBlog imageUrl={image} blog={content} />
        <BlogComment authorId={authorId} blogId={id} />
        {/* Pass userId to CommentSectionBlog */}
        <CommentSectionBlog blogId={id} userId={userId} comments={comments} />
      </div>
    </div>
  );
}

export default page;
