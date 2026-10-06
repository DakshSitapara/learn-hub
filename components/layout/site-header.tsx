"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserNav } from "@/components/user-nav";

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
          className="flex shrink-0 items-center gap-2.5"
          aria-label="LearnHub home"
        >
          <Image
            src="/logo/logo-nav.png"
            alt=""
            width={42}
            height={42}
            className="size-10 object-contain"
            priority
          />

          <span className="text-2xl font-extrabold tracking-[-0.04em] leading-none">
            <span className="text-[#063B2E]">Learn</span>
            <span className="text-[#16B978]">Hub</span>
          </span>
        </Link>

        <nav
          aria-label="Main navigation"
          className="flex flex-1 items-center gap-5"
        >
          <Link
            href="/courses"
            aria-current={pathname.startsWith("/courses") ? "page" : undefined}
            className={`text-sm font-medium transition-colors hover:text-foreground ${
              pathname.startsWith("/courses")
                ? "text-foreground"
                : "text-muted-foreground"
            }`}
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
