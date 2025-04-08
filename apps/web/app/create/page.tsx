import Navbar from "../components/Navbar";
import FetchContribs from "../components/FetchContribs";

export default function Create() {
    return (
        <div className="min-h-screen text-slate-200">
          <Navbar />
            <main className="container mx-auto py-8">
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="w-full md:w-2/3">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold">Your Contributions</h2>
                            <FetchContribs />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
