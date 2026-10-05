"use client";

export default function ErrorPage({
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <main className="grid min-h-[60vh] place-items-center bg-[#f5f7f2] px-4 text-center text-[#182b23]">
      <div>
        <h1 className="text-2xl font-semibold">We could not load this page</h1>
        <p className="mt-2 text-sm text-[#64736a]">
          Check your connection and try loading the page again.
        </p>
        <button
          type="button"
          onClick={retry}
          className="mt-5 rounded-sm bg-[#245640] px-4 py-2 text-sm font-semibold text-white hover:bg-[#153f30]"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
