"use client";

import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { AnimatedThemeToggler } from "@/components/animated-theme-toggler";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

export function UserNav() {
  const { isLoaded, isSignedIn, user } = useUser();

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      {!isLoaded ? (
        <div
          className="h-9 w-24 animate-pulse rounded-md bg-muted"
          aria-label="Loading account"
        />
      ) : isSignedIn && user ? (
        <div className="flex items-center gap-3">
          <UserButton
            showName
            fallback={<Skeleton className="h-9 w-32 rounded-md" />}
            appearance={{
              elements: {
                userButtonTrigger:
                  "rounded-md! text-card-foreground! px-2! py-1!",
                userButtonBox: "flex-row-reverse! gap-2!",
                userButtonOuterIdentifier:
                  "text-[13px]! font-medium! text-foreground! pl-0!",
                userButtonAvatarBox: "size-6! rounded-sm!",
              },
            }}
          />
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <SignInButton>
            <Button variant="outline" size="sm" className="w-full">
              Sign In
            </Button>
          </SignInButton>
        </div>
      )}
      <AnimatedThemeToggler />
    </div>
  );
}
