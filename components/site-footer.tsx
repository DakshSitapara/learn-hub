"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookAIcon } from "lucide-react";

export function SiteFooter() {
  const pathname = usePathname();

  if (pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up")) {
    return null;
  }

  return (
    <footer className="mt-auto border-t border-border bg-background">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex w-fit items-center gap-2 font-semibold text-foreground"
          aria-label="LearnHub home"
        >
          <BookAIcon className="size-4 text-primary" aria-hidden="true" />
          LearnHub
        </Link>

        <nav aria-label="Footer navigation" className="flex items-center gap-5">
          <Link href="/" className="transition hover:text-foreground">
            Home
          </Link>
          <Link href="/courses" className="transition hover:text-foreground">
            Courses
          </Link>
        </nav>

        <p>© {new Date().getFullYear()} LearnHub</p>
      </div>
    </footer>
  );
}
