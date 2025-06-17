"use client";

import { useEffect, useState } from "react";
import DashboardLoadingState from "../components/DashboardLoadingState";
import { Divide, MoreHorizontal } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

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
           setPosts(data.posts);
        } catch (e) {
            console.error("Error fetching commits: ", e);
        } finally {
            setLoadingPosts(false);
        };
    };

    useEffect(() => {

    }, []);

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-slate-200">
         {loadingPosts ? (
            <DashboardLoadingState />
          ) : (posts.length === 0) ? (
            <div className="p-6 text-center bg-zinc-900 rounded-lg">
            <Divide className="mx-auto mb-4 h-8 w-8 text-zinc-500" />
            <p className="text-lg">No posts yet</p>
            <p className="text-sm text-zinc-500">Generate your first post!</p>
          </div>
          ) : (
          <div>  
          <div className="mb-8">
            <h2 className="bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text font-medium text-2xl mb-2">Published Posts</h2>
            <p className="text-zinc-400">Your published Twitter posts from GitHub commits</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {posts.map((post) => (
                <TwitterPostCard key={post.id} postContent={post} />
            ))}
          </div>
          </div>
         )}
        </main>
    )
};