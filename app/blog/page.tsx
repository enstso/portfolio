import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Blog() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center  text-neutral-900 dark:text-neutral-100">
      <div className="text-center p-8 max-w-lg mx-auto">
        <h1 className="text-4xl font-extrabold mb-4 text-neutral-900 dark:text-neutral-100">
          Blog Coming Soon
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-6">
          We're working hard to bring you the latest content. Stay tuned!
        </p>
        <Link href={"https://www.linkedin.com/in/enstso-j-1a274724a/"} className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 dark:focus-visible:ring-zinc-300 h-9 px-4 py-2 bg-zinc-900 text-zinc-50 shadow hover:bg-zinc-900/90 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90 mt-4">Notify Me</Link>
      </div>
    </div>
  );
}
