import { MdChatBubble, MdGroups } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import { useLogout } from "../../../../hooks/useLogout";
import MenuItem from "./MenuItem";

interface MenuItemsProps {
  onNavigate?: () => void;
}

export default function MenuItems({ onNavigate }: MenuItemsProps) {
  const navigate = useNavigate();

  const logoutMutation = useLogout();

  const items = [
    { name: "Conversas", path: "/conversations", icon: <MdChatBubble /> },
    { name: "Amigos", path: "/friendships", icon: <MdGroups /> },
  ];

  function handleLogout() {
    logoutMutation.mutate(undefined, {
      onSettled: () => {
        navigate("/login");
      },
    });
  }

  return (
    <nav className="flex h-full flex-col gap-2 px-3">
      {items.map((item) => (
        <MenuItem
          key={item.path}
          name={item.name}
          path={item.path}
          icon={item.icon}
          onNavigate={onNavigate}
        />
      ))}

      <button
        onClick={handleLogout}
        className="button-logout"
        disabled={logoutMutation.isPending}
      >
        SAIR
      </button>
    </nav>
  );
}
