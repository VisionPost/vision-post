import Image from "next/image";

export default async function Create() {
    return (
        <div className="min-h-screen text-slate-300">
            <header className="border-b border-gray-800 py-3 px-4">
                <div className="container flex items-center justify-between">
                    <div className="flex items-center gap-8">
                       <h1 className="text-xl ">VisionPost</h1> 
                    </div>
                </div>
            </header>
        </div>
    );
};
