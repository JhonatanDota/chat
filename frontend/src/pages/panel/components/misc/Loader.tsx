type LoaderProps = {
  size?: "sm" | "md" | "lg";
};

export default function Loader(props: LoaderProps) {
  const { size = "lg" } = props;

  const sizeClasses: Record<typeof size, string> = {
    sm: "w-4 h-4 border-2",
    md: "w-8 h-8 border-4",
    lg: "w-12 h-12 border-4",
  };

  return (
    <div className="flex items-center justify-center p-3">
      <div
        className={`animate-spin rounded-full border-t-transparent ${sizeClasses[size]}`}
      />
    </div>
  );
}
