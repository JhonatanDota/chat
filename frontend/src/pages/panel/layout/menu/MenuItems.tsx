import { MdChatBubble, MdGroups } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import { removeToken } from "../../../../functions/auth";
import { logout } from "../../../../requests/authRequests";
import { handleErrors } from "../../../../requests/handleErrors";
import MenuItem from "./MenuItem";

interface MenuItemsProps {
  onNavigate?: () => void;
}

export default function MenuItems(props: MenuItemsProps) {
  const { onNavigate } = props;

  const navigate = useNavigate();

  const items = [
    { name: "Conversas", path: "/conversations", icon: <MdChatBubble /> },
    { name: "Amigos", path: "/friendships", icon: <MdGroups /> },
  ];

  async function handleLogout() {
    try {
      await logout();
      removeToken();
      navigate("/login");
    } catch (error) {
      handleErrors(error);
    }
  }

  return (
    <nav className="flex flex-col h-full gap-2 px-3">
      {items.map((item) => (
        <MenuItem
          key={item.path}
          name={item.name}
          path={item.path}
          icon={item.icon}
          onNavigate={onNavigate}
        />
      ))}

      <button onClick={handleLogout} className="button-logout">
        SAIR
      </button>
    </nav>
  );
}
