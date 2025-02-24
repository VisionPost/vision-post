import { getServerSession } from "next-auth";
import AuthComponent from "./components/authComponent";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession();
  if(session?.user) {
    redirect("/dashboard");
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <AuthComponent />
    </div>
  );
}
