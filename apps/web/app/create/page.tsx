"use client";

import Navbar from "../components/Navbar";
import { Button } from "@/components/ui/button";
import { Loader2, RefreshCw } from "lucide-react";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination";

interface Contribution {
    type: string;
    title: string;
    sha?: string;
    author: string;
    image: string;
    date: string;
    url: string;
    repo: string;
    repoDescription: string;
    timestamp: number;
    body?: string;
    number?: number;
};

export default function Create() {
    const [loading, setLoading] = useState(false);
    const [contributions, setContributions] = useState<Contribution[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    const contributionsPerPage = 5;
    const totalPages = Math.ceil(contributions.length / contributionsPerPage);

    const fetchContributions = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/fetch-contributions`, { 
                method: "GET",
                credentials: "include",
            });
    
            const data = await response.json();
       
            if(!response.ok) {
                console.log("Error fetching commits: ", data.error);
                return;
            };
    
            setContributions(data.githubData);
            console.log(data.githubData)
            setCurrentPage(1);
        } catch (error) {
            console.error("Error fetching commits: ", error);
        } finally {
            setLoading(false);
        }
    };

    const getCurrentContributions = () => {
        const startIndex = (currentPage - 1) * contributionsPerPage;
        return contributions.slice(startIndex, startIndex + contributionsPerPage);
    };

    const renderPagination = () => {
        if (totalPages <= 1) return null;

        return (
            <Pagination className="mt-6">
             <PaginationContent>
              {Array.from({ length: Math.min(5, totalPages)}, (_, i) => {
                const pageNum = i + 1 + Math.max(0, currentPage - 3)
                if (pageNum > totalPages) return null;

                return (
                    <PaginationItem key={pageNum}>
                      <PaginationLink 
                      isActive={pageNum === currentPage} 
                      onClick={() => setCurrentPage(pageNum)} 
                      className="bg-black text-white border-gray-800" >
                        {pageNum}
                      </PaginationLink>  
                    </PaginationItem>
                )
              })}
              {totalPages > 5 && currentPage < totalPages - 2 && (
            <>
            <PaginationItem>
              <PaginationLink className="cursor-default">...</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink onClick={() => setCurrentPage(totalPages)}>{totalPages}</PaginationLink>
            </PaginationItem>
            </>
            )}  
             </PaginationContent>
            </Pagination>
        )
    };

    return (
    <div className="min-h-screen text-slate-200">
        <Navbar />
        <main className="container mx-auto py-8">
            <div className="flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-2/3">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold">Your Contributions</h2>
                        <Button
                        onClick={fetchContributions}
                        disabled={loading}
                        className="bg-slate-200 text-black hover:bg-slate-300 cursor-pointer"
                        >
                        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCw className="mr-2 h-4 w-4" /> }
                        Fetch Contributions
                        </Button>
                     </div>
    
            {contributions.length > 0 ? (    
            <>  
            <div className="grid gap-4">   
            {getCurrentContributions().map((contribution, index) => (   
              <Card key={index} className="bg-black border-gray-800">      
                <CardContent>    
                  <div className="flex justify-between items-start">     
                    <div className="flex items-center gap-3">         
                    <Avatar>     
                        <AvatarImage    
                        src={contribution.image} 
                        alt={contribution.author}        
                        />        
                        <AvatarFallback>
                        {contribution.author.substring(0, 2)}
                        </AvatarFallback>
                    </Avatar>
                        <div>
                            <div className="text-slate-200">{contribution.author}</div>
                            <div className="text-sm text-gray-400">{contribution.date}</div>
                        </div>
                    </div>
                    <Badge variant="outline" className="text-slate-200 bg-zinc-950 border-gray-800">
                      {contribution.sha?.substring(0, 7) || contribution.number}
                    </Badge> 
                    </div>
                    <p className="mt-5 text-gray-300 font-extrabold"><span className="text-gray-400">{contribution.type.toUpperCase()} - </span>{contribution.title}</p>
                    <div className="flex justify-between mt-4">
                      <h1 className="text-gray-400 font-bold mt-1">Repository - <span className="text-slate-200">{contribution.repo}</span></h1>  
                      <Button
                      variant="outline"
                      className="bg-slate-200 text-black hover:bg-slate-300 cursor-pointer border-0"
                      >
                        Generate Post
                      </Button>
                    </div>
                    </CardContent>
                    </Card>
                ))}
            </div>
            {renderPagination()}
            </>
            ) : (
            <>
            <h1>No contributions found. Click Fetch Contributions to load your GitHub activity.</h1>
            </>
            )}
            </div>
            </div>
            </main>
        </div>
    );
};
