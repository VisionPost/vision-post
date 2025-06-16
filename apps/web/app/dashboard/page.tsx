"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {
    const [posts, setPosts] = useState([]);
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
            
            setPosts(posts);
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
        <div className="text-slate-200">Dashboard</div>
    )
};