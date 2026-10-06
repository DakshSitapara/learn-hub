"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AlertCircleIcon, HomeIcon, RefreshCwIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error("LearnHub error:", error);
  }, [error]);

  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center text-center">
          <div className="grid size-16 place-items-center rounded-full bg-destructive/10">
            <AlertCircleIcon
              className="size-8 text-destructive"
              aria-hidden="true"
            />
          </div>

          <div className="mt-6 space-y-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Something went wrong
            </h1>

            <p className="text-sm leading-6 text-muted-foreground">
              We couldn&apos;t load this page. Please try again or return to
              your LearnHub dashboard.
            </p>
          </div>

          <div className="mt-6 flex w-full flex-col gap-3 sm:flex-row">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => router.push("/")}
            >
              <HomeIcon className="mr-2 size-4" aria-hidden="true" />
              Go to Dashboard
            </Button>

            <Button className="flex-1" onClick={reset}>
              <RefreshCwIcon className="mr-2 size-4" aria-hidden="true" />
              Try Again
            </Button>
          </div>

          <p className="mt-6 text-xs leading-5 text-muted-foreground">
            If the problem continues, please refresh the page and try again.
          </p>
        </div>
      </div>
    </main>
  );
}
