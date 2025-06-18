"use client";

import { useEffect, useState } from "react";
import DashboardLoadingState from "../components/DashboardLoadingState";
import { Divide, MoreHorizontal } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

interface Post {
    id: string;
    content: string;
    postedAt: Date;
};

interface TwitterPostCardProps {
    postContent: Post;
};

function TwitterPostCard({ postContent }: TwitterPostCardProps) {
    const { data: session } = useSession();
    const avatarUrl = session?.user.image ?? "/logo.jpeg";

    return (
        <Card className="bg-gradient-to-b from-zinc-900 to-zinc-950 border-zinc-900 rounded-sm">
          <CardContent>
          <div className="flex items-start space-x-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src={avatarUrl} alt={session?.user.name?.substring(0, 2)} />
            <AvatarFallback className="bg-gray-700 text-gray-300">
              {session?.user.name?.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-gray-300 text-sm">@{session?.user.x_userName}</span>
              <span className="text-gray-500 text-sm">·</span>
              <span className="text-gray-500 text-sm">{new Date(postContent.postedAt).toLocaleDateString()}</span>
              <Button variant="ghost" size="sm" className="ml-auto p-1 h-auto text-gray-500 hover:bg-zinc-900 hover:text-gray-300">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
        
          <p className="text-gray-200 text-sm leading-relaxed mb-3 break-words">{postContent.content}</p>
          </div>
        </div>
        </CardContent>
        </Card>
    )
};

export default function Dashboard() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loadingPosts, setLoadingPosts] = useState(false);
    const [currentPage, setCurrentPage] = useState(1)

    const postsPerPage = 6
    const totalPages = Math.ceil(posts.length / postsPerPage)
    const startIndex = (currentPage - 1) * postsPerPage
    const currentPosts = posts.slice(startIndex, startIndex + postsPerPage)

    const fetchPosts = async () => {
        setLoadingPosts(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/posts/fetch-posts`, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
    
            if(!response.ok) {
                console.log("Error fetching posts: ", data.error);
                return;
            };
            console.log(data.posts);
            const reversedPosts = [...data.posts].reverse(); 
           setPosts(reversedPosts);
        } catch (e) {
            console.error("Error fetching commits: ", e);
        } finally {
            setLoadingPosts(false);
        };
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-slate-200">
         {loadingPosts ? (
            <DashboardLoadingState />
          ) : (posts.length === 0) ? (
            <div className="p-6 text-center bg-gradient-to-b from-zinc-900 to-zinc-950 rounded-lg">
            <Divide className="mx-auto mb-4 h-8 w-8 text-zinc-500" />
            <p className="text-lg mb-2">No posts yet</p>
            <p className="text-sm text-zinc-500 mb-4">Go to the create page and generate your first post!</p>
            <Link href="/dashboard/create" className="mt-5">
            <Button
            className="text-black bg-slate-200 w-30 hover:bg-slate-300 font-medium transition-colors cursor-pointer"
            >
              Create
            </Button>
            </Link>
          </div>
          ) : (
          <div>  
          <div className="mb-8">
            <h2 className="bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text font-medium text-2xl mb-2">Published Posts</h2>
            <p className="text-zinc-400">Your published Twitter posts from GitHub commits</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {currentPosts.map((post) => (
                <TwitterPostCard key={post.id} postContent={post} />
            ))}
          </div>

          {totalPages > 1 && (
          <div className="flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      if (currentPage > 1) setCurrentPage(currentPage - 1)
                    }}
                    className={`text-gray-400 hover:text-white ${currentPage === 1 ? "pointer-events-none opacity-50" : ""}`}
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        setCurrentPage(page)
                      }}
                      isActive={currentPage === page}
                      className={`${
                        currentPage === page
                          ? "bg-zinc-900-600 text-slate-200 border-zinc-800"
                          : "text-gray-400 hover:text-white hover:bg-gray-800"
                      }`}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      if (currentPage < totalPages) setCurrentPage(currentPage + 1)
                    }}
                    className={`text-gray-400 hover:text-white ${currentPage === totalPages ? "pointer-events-none opacity-50" : ""}`}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
        </div>
      )}
      </main>
    )
};