import { Auth } from "@/components/ui/ui/Auth";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex gap-4 text-4xl font-bold min-h-screen flex-col items-center justify-center p-24">
      Mini Admin-pannel
      <Auth type="signin" />
    </main>
  );
}
