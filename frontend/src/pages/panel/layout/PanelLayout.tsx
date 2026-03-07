import { Outlet } from "react-router-dom";

import AdminMenu from "./menu/Menu";

export default function PanelLayout() {
  return (
    <div className="flex min-h-screen w-full flex-col md:flex-row">
      <AdminMenu />

      <main className="grow overflow-auto p-4 md:p-6">
        <Outlet />
      </main>
    </div>
  );
}
