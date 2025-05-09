import Link from "next/link";

export default function Navbar() {
    return (
        <header className="border-b border-gray-800 py-3 px-4">
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center">
              <h1 className="bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text text-xl font-bold ml-12">VisionPost</h1>
            </div>

            <nav className="hidden md:flex items-center gap-6">
              <Link href="/dashboard" className="text-slate-300 hover:text-white cursor-pointer">
                Dashboard
              </Link>
              <Link href="/create" className="text-slate-300 hover:text-white cursor-pointer">
                Create
              </Link>
              <Link href="/analytics" className="text-slate-300 hover:text-white cursor-pointer">
                Analytics
              </Link>
            </nav>
          </div>
        </div>  
        </header>        
    )
};