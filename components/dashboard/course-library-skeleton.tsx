type CourseLibrarySkeletonProps = {
  libraryOnly: boolean;
};

export function CourseLibrarySkeleton({
  libraryOnly,
}: CourseLibrarySkeletonProps) {
  const className = libraryOnly
    ? "grid gap-5 sm:grid-cols-2 xl:grid-cols-4"
    : "flex snap-x snap-mandatory gap-5 overflow-hidden pb-4";

  return (
    <div className={className} aria-label="Loading courses">
      {Array.from({ length: 8 }, (_, index) => (
        <div
          key={index}
          className={`h-97.5 animate-pulse rounded-md border border-[#e1e6df] bg-white ${
            libraryOnly
              ? ""
              : "w-[min(84vw,21rem)] shrink-0 snap-start sm:w-[min(43vw,21rem)] lg:w-[21rem]"
          }`}
        />
      ))}
    </div>
  );
}
