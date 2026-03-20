export default function UserBoxSkeleton() {
  return (
    <div className="flex animate-pulse flex-col gap-3 rounded-md border-2 border-secondary bg-primary p-3 md:flex-row md:justify-between">
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-full bg-secondary" />

        <div className="flex min-w-0 flex-col gap-2">
          <div className="h-4 w-32 rounded bg-secondary" />
          <div className="h-3 w-24 rounded bg-secondary" />
        </div>
      </div>

      <div className="self-end md:self-center">
        <div className="h-8 w-24 rounded bg-secondary" />
      </div>
    </div>
  );
}
