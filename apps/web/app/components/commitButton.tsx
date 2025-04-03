"use client";

export default function CommitButton() {
    const fetchContributions = async () => {
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

            console.log("Commits received:", data);

        } catch (error) {
            console.error("Error fetching commits: ", error);
        };
    };

    return (
        <div className="text-white min-h-screen flex justify-center items-center">
            <button 
            className="bg-white text-black px-4 py-2 font-medium hover:bg-gray-300"
            onClick={fetchContributions}
            >Fetch contributions</button>
        </div>
    );
};