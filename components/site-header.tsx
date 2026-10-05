"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserNav } from "@/components/user-nav";
import { BookAIcon } from "lucide-react";

export function SiteHeader() {
  const pathname = usePathname();

  if (pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up")) {
    return null;
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center gap-6 px-4 sm:px-6">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 font-semibold text-foreground"
          aria-label="LearnHub home"
        >
          <span className="grid size-8 place-items-center rounded-md bg-primary text-sm font-bold text-primary-foreground">
            <BookAIcon className="size-4" />
          </span>
          <span className="text-base">LearnHub</span>
        </Link>
        <nav
          aria-label="Main navigation"
          className="flex flex-1 items-center gap-5"
        >
          <Link
            href="/courses"
            aria-current={pathname.startsWith("/courses") ? "page" : undefined}
            className={`text-sm font-medium transition hover:text-foreground ${pathname.startsWith("/courses") ? "text-foreground" : "text-muted-foreground"}`}
          >
            Courses
          </Link>
        </nav>
        <div className="ml-auto">
          <UserNav />
        </div>
      </div>
    </header>
  );
}
