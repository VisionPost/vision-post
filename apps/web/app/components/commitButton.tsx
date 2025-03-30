"use client";

export default function CommitButton() {
    const fetchCommits = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/fetch-commits`, { 
                method: "GET",
                credentials: "include",
            });

            const data = await response.json();
       
            if(!response.ok) {
                console.log("Error fetching commits: ", data.error);
            };

            console.log("Commits received:", data);

        } catch (error) {
            console.error("Error fetching commits: ", error);
        };
    };

    return (
        <div className="text-white min-h-screen flex justify-center items-center">
            <button 
            className="bg-white text-black px-4 py-2 font-medium hover:bg-gray-300"
            onClick={fetchCommits}
            >Fetch commits</button>
        </div>
    );
};