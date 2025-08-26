import React from "react";
import { userById } from "@/actions/userActions";
import { Clock } from "lucide-react";
import { checkFollowing } from "@/actions/userActions";
import Link from "next/link";
import FollowAuthorButton from "./FollowAuthorButton";

async function AuthorInBlog({ authorId, userId }) {
  const result = await userById(authorId);

  if (!result.success || !result.message) {
    console.error("Error fetching author data:", result.message);
    return null; // Return nothing if there's an error
  }

  const {  isFollowing } = await checkFollowing(userId, authorId);
  const author = result.message;
  return (
    <div className="flex items-center justify-between mb-8 px-4 py-3 bg-white border-t border-b">
      <div className="flex items-center gap-4">
        {/* Author Image */}
        <Link href={`/profile/${author.username}`}>
          <img
            src={author.image}
            alt={author.name}
            className="w-12 h-12 rounded-full object-cover border-2 border-indigo-50"
          />
        </Link>

        <div className="flex flex-col items-start">
          <h3 className="font-semibold text-gray-900">
            <Link href={`/profile/${author.username}`}>{author.name}</Link>
          </h3>
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <Clock size={14} className="text-indigo-400" />
            <span>5 min read</span>
            <span>•</span>
            <time>
              {new Date(author.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </time>
          </div>
        </div>
      </div>
      {userId !== authorId && (
        <FollowAuthorButton userId={userId} authorId={authorId} isFollowing={isFollowing} />
      )}
    </div>
  );
}

export default AuthorInBlog;
