import { RiChat3Line } from "react-icons/ri";

interface BrandIconProps {
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: {
    container: "w-10 h-10 p-2",
    icon: "w-5 h-5",
  },
  md: {
    container: "w-14 h-14 p-3",
    icon: "w-8 h-8",
  },
  lg: {
    container: "w-20 h-20 p-4",
    icon: "w-12 h-12",
  },
};

export function BrandIcon(props: BrandIconProps) {
  const { size = "md" } = props;
  const current = sizes[size];

  return (
    <div
      className={`flex items-center justify-center rounded-xl bg-tertiary text-white ${current.container}`}
    >
      <RiChat3Line className={current.icon} />
    </div>
  );
}
