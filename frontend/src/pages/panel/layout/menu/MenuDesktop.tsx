import { BrandIcon } from "../../../../components/BrandIcon";
import MenuItems from "./MenuItems";

export default function MenuDesktop() {
  return (
    <aside className="sticky top-0 hidden h-screen w-56 min-w-56 flex-col gap-3 bg-primary text-gray-100 md:flex">
      <div className="flex h-16 items-center gap-2 border-b-2 border-secondary px-4">
        <BrandIcon size="xs" />
        <span className="text-base font-bold">Chat</span>
      </div>
      <MenuItems />
    </aside>
  );
}
