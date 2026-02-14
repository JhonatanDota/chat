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
      <div className="flex items-center justify-between px-2 md:hidden h-14">
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 rounded hover:bg-gray-700"
        >
          <FiMenu className="h-7 w-7 text-primary-text" />
        </button>
      </div>

      <div
        className={`fixed inset-0 z-50 md:hidden transition-opacity duration-150 ${
          mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-muted"
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={`absolute left-0 top-0 h-full w-64 bg-primary text-gray-100 flex flex-col gap-3 transform transition-transform duration-300
            ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="flex items-center justify-between h-16 px-4 border-b-2 border-secondary">
            <BrandIcon size="xs" />
            <span className="text-base font-bold">Chat</span>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 rounded hover:bg-gray-700"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>
          <MenuItems onNavigate={() => setMobileOpen(false)} />
        </div>
      </div>
    </>
  );
}
