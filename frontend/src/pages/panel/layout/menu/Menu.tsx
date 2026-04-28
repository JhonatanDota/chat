import { useState } from "react";
import { useMatches } from "react-router-dom";

import DesktopMenu from "./MenuDesktop";
import MobileMenu from "./MenuMobile";

export default function Menu() {
  const matches = useMatches();
  const [mobileOpen, setMobileOpen] = useState(false);

  const hideMobileMenu = matches.some((match) => {
    const { handle } = match;

    if (!handle || typeof handle !== "object") return false;

    return (handle as { hideMobileMenu?: boolean }).hideMobileMenu === true;
  });

  return (
    <>
      {!hideMobileMenu && (
        <MobileMenu mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      )}
      <DesktopMenu />
    </>
  );
}
