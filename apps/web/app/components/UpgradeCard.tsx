import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link";

export default function UpgradeCard() {
    return (
    <Card className="border-zinc-800 bg-black">
      <CardContent className="space-y-3">
        <div className="space-y-1">
          <h3 className="font-semibold text-slate-200">Upgrade to Pro!</h3>
          <p className="text-sm text-slate-300">Pro Tier: More posts, smarter AI, generous rate limits.</p>
        </div>
        <Link href="/pricing">
          <Button className="w-full bg-slate-200 hover:bg-slate-300 text-black cursor-pointer">
            Upgrade
          </Button>
        </Link>
      </CardContent>
    </Card>
    );
};