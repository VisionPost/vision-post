import { getServerSession } from "next-auth";
import AuthComponent from "./components/authComponent";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession();
  if(session?.user) {
    redirect("/dashboard");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-black text-white">
      <AuthComponent />
    </div>
  );
}
