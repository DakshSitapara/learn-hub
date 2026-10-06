"use client";

import { useRouter } from "next/navigation";
import { BookOpenIcon, HomeIcon, ArrowLeftIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  const router = useRouter();

  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center text-center">
          <div className="grid size-16 place-items-center rounded-full bg-muted">
            <BookOpenIcon
              className="size-8 text-muted-foreground"
              aria-hidden="true"
            />
          </div>

          <div className="mt-6 space-y-2">
            <p className="text-sm font-semibold text-[#16B978]">404</p>

            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Page not found
            </h1>

            <p className="text-sm leading-6 text-muted-foreground">
              The page you&apos;re looking for doesn&apos;t exist or may have
              been moved.
            </p>
          </div>

          <div className="mt-6 flex w-full flex-col gap-3 sm:flex-row">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => router.back()}
            >
              <ArrowLeftIcon className="mr-2 size-4" aria-hidden="true" />
              Go Back
            </Button>

            <Button className="flex-1" onClick={() => router.push("/")}>
              <HomeIcon className="mr-2 size-4" aria-hidden="true" />
              Go to Dashboard
            </Button>
          </div>

          <p className="mt-6 text-xs text-muted-foreground">
            Try checking the URL or return to your dashboard to continue
            learning.
          </p>
        </div>
      </div>
    </main>
  );
}
