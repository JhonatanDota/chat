import { BrandIcon } from "../../../../components/BrandIcon";
import MenuItems from "./MenuItems";

export default function MenuDesktop() {
  return (
    <aside className="sticky top-0 flex-col hidden w-56 h-screen gap-3 text-gray-100 md:flex min-w-56 bg-primary">
      <div className="flex items-center h-16 gap-2 px-4 border-b-2 border-secondary">
        <BrandIcon size="xs" />
        <span className="text-base font-bold">Chat</span>
      </div>
      <MenuItems />
    </aside>
  );
}
