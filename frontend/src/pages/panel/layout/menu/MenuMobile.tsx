import { FiMenu, FiX } from "react-icons/fi";

import { BrandIcon } from "../../../../components/BrandIcon";
import MenuItems from "./MenuItems";

type MenuMobileProps = {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
};

export default function MenuMobile(props: MenuMobileProps) {
  const { mobileOpen, setMobileOpen } = props;
  return (
    <>
      <div className="flex h-14 items-center justify-between px-2 md:hidden">
        <button
          onClick={() => setMobileOpen(true)}
          className="rounded p-2 hover:bg-gray-700"
        >
          <FiMenu className="h-7 w-7 text-primary-text" />
        </button>
      </div>

      <div
        className={`fixed inset-0 z-50 transition-opacity duration-150 md:hidden ${
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div
          className="absolute inset-0 bg-muted"
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={`absolute left-0 top-0 flex h-full w-64 transform flex-col gap-3 bg-primary text-gray-100 transition-transform duration-300 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="flex h-16 items-center justify-between border-b-2 border-secondary px-4">
            <BrandIcon size="xs" />
            <span className="text-base font-bold">Chat</span>
            <button
              onClick={() => setMobileOpen(false)}
              className="rounded p-2 hover:bg-gray-700"
            >
              <FiX className="h-5 w-5" />
            </button>
          </div>
          <MenuItems onNavigate={() => setMobileOpen(false)} />
        </div>
      </div>
    </>
  );
}
