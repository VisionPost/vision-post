import { getServerSession } from "next-auth"
import { authOptions } from "../lib/auth"

export default async function Dashboard() {
    const session = await getServerSession(authOptions);
    console.log(session);
    return (
        <div className="text-white">     
         Dashboard
        </div>
    )
};