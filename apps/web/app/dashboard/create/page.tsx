"use client";

import { Button } from "@/components/ui/button";
import { Loader2, RefreshCw } from "lucide-react";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination";
import { Textarea } from "@/components/ui/textarea";
import { FaXTwitter } from "react-icons/fa6";

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
    const [loadingPost, setloadingPost] = useState(false);
    const [contributions, setContributions] = useState<Contribution[]>([]);
    const [selectedContribution, setSelectedContribution] = useState<Contribution | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [generatedPost, setGeneratedPost] = useState<string>("");
    const [showPostEditor, setShowPostEditor] = useState(false);
    const [posting, setPosting] = useState(false);

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

    const generatePost = async (contribution: Contribution) => {
      setSelectedContribution(contribution);
      setGeneratedPost("");
      setloadingPost(true);
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/posts/generate`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(contribution),
        });

        if(!response) {
          console.log("no res");
        };

        const data = await response.json();
        console.log(data);
        setGeneratedPost(data.post);
        setShowPostEditor(true);
      } catch (error) {
        console.log(error);
      } finally {
        setloadingPost(false);
      };
    };

    const postToTwitter = async (post: string) => {
        setPosting(true);
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/twitter-post`, {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ post }),
          });

          const data = await response.json();

          if(!response.ok) {
            console.error("couldn't post to twitter", data.error);
          } else {
            console.log("Tweet posted:", data);
            alert("✅ Tweet Posted");
          };
        } catch (e) {
          console.error("Internal server error posting to twitter:", e);
        } finally {
          setPosting(false);
        };
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
        <main className="container mx-auto py-8 px-5 md:px-7">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/2">
              <div className="flex items-center justify-between mb-6">
                <h2 className="bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text text-2xl font-medium">Your Contributions</h2>
                <Button
                  onClick={fetchContributions}
                  disabled={loading}
                  className="bg-slate-200 hover:bg-slate-300 text-black cursor-pointer"
                >
                  {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCw  className="mr-2 h-4 w-4" /> }
                  <span className="bg-gradient-to-r from-white to-gray-400 text-transparen  bg-clip-text">Fetch Contributions</span>
                </Button>
          </div>
    
            {contributions.length > 0 ? (    
            <>  
            <div className="grid gap-4">   
            {getCurrentContributions().map((contribution, index) => (   
              <Card key={index} className="bg-gradient-to-b from-zinc-900 to-zinc-950 border-zinc-900 rounded-sm">      
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
                    <Badge variant="outline" className="text-slate-200 border-zinc-800">
                      {contribution.sha?.substring(0, 7) || contribution.number}
                    </Badge> 
                    </div>
                    <p className="mt-5 text-gray-300 font-medium"><span className="text-gray-400">{contribution.type.toUpperCase()} - </span>{contribution.title}</p>
                    <div className="flex justify-between mt-4">
                      <h1 className="text-gray-400 font-medium mt-1">Repository - <span className="text-slate-200">{contribution.repo}</span></h1>  
                      <Button
                      variant="outline"
                      disabled={loadingPost}
                      className="bg-slate-200 text-black hover:bg-slate-300 cursor-pointer border-0"
                      onClick={() => generatePost(contribution)}
                      >
                      {loadingPost ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : ""} 
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
            <Card className="bg-gradient-to-b from-zinc-900 to-zinc-950 border-zinc-900 rounded-sm">
              <CardContent className="p-8 text-center">
                <p className="text-gray-400 mb-4">No contributions loaded yet</p>
                <Button
                onClick={fetchContributions}
                disabled={loading}
                variant="outline"
                className="bg-slate-200 text-black hover:bg-slate-300 cursor-pointer border-0"
                >
                  {loading ? "Loading..." : "Fetch Contributions"}
                </Button>
              </CardContent>
            </Card>
            )}
            </div>

            <div className="w-full md:w-1/2">
              <h2 className="text-center text-2xl font-medium mb-7 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Post Editor</h2>
              {showPostEditor ? (
                <Card className="bg-gradient-to-b from-zinc-900 via-zinc-950 to-zinc-900 border-zinc-900 rounded-sm">
                  <h1 className="text-white text-xl text-center font-medium">
                    <span className="text-gray-400">{selectedContribution?.type.toUpperCase()} - </span>{selectedContribution?.title}
                  </h1>
                  <CardContent>
                    <div className="mb-4 rounded-sm p-4 border border-zinc-800">
                      <div className="flex justify-between">
                      <div className="flex items-center gap-3 mb-3">
                        <Avatar>
                          <AvatarImage 
                          src={selectedContribution?.image}
                          alt={selectedContribution?.author}
                          />
                          <AvatarFallback>{selectedContribution?.author.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div className="text-white">
                          <div className="font-medium">{selectedContribution?.author}</div>
                          <div className="font-medium text-gray-400">{selectedContribution?.date}</div>
                        </div>
                      </div>
                      <FaXTwitter className="text-gray-400 h-5 w-5 mt-2" />
                    </div>
                    
                      <Textarea
                      value={generatedPost}
                      onChange={(e) => setGeneratedPost(e.target.value)} 
                      className="bg-zinc-950 border-zinc-700 mb-3 text-white text-sm focus-visible:border-blue-600 focus:outline-none focus:ring-0"
                      rows={4}
                      />
                      <div className="flex items-center justify-between">
                       <div className="text-sm text-gray-400">{generatedPost.length}/280</div>
                       <Button 
                       className="bg-slate-200 text-black hover:bg-slate-300 cursor-pointer border-0"
                       size="sm"
                       disabled={posting}
                       onClick={() => postToTwitter(generatedPost)}
                       >
                        {posting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <FaXTwitter className="mr-1 h-4 w-4" />}
                        Post to Twitter
                       </Button>
                    </div>
                    </div>

                    <div className="space-y-4">
                    <h3 className="text-gray-400 fomt-medium text-xl">Post Preview</h3>
                    <div className="w-full bg-slate-200 text-black font-medium h-6 text-center rounded-sm">Twitter</div>
                    <div className="w-full border border-zinc-800 bg-zinc-950 rounded-sm">
                    <div className="p-4">
                     <div className="flex items-center gap-3 mb-2">
                     <Avatar className="w-8 h-8">
                      <AvatarImage 
                        src={selectedContribution?.image}
                        alt={selectedContribution?.author}
                      />
                      <AvatarFallback>{selectedContribution?.author.substring(0, 2)}</AvatarFallback>
                     </Avatar>
                     <span className="font-medium text-gray-400">{selectedContribution?.author}</span>
                     </div>
                     <p className="text-sm text-white font-medium">{generatedPost}</p>
                    </div>
                    </div> 
                  </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="bg-gradient-to-b from-zinc-900 to-zinc-950 border-zinc-900 rounded-sm">
                  <CardContent className="p-8 text-center">
                  <p className="text-gray-400" >Generate a post from a contribution to view the editor</p>
                  </CardContent>
                </Card>
              )}

            <Card className="bg-gradient-to-b from-zinc-900 to-zinc-950 border-zinc-900 mt-6 rounded-sm">
            <CardContent>
                <h3 className="font-medium mb-3 text-white">Quick Start Guide</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-400">Fetch your contributions</span>
                    <span className="text-gray-500 ml-auto">Step 1</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-400">Generate a post from a contribution</span>
                    <span className="text-gray-500 ml-auto">Step 2</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-gray-400">Chat with AI to refine your post</span>
                    <span className="text-gray-500 ml-auto">Step 3</span>
                  </div>
                </div>
              </CardContent>
            </Card>  

            </div>
          </div>
        </main>
      </div>
    );
};
