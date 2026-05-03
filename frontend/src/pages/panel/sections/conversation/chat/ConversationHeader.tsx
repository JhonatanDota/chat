import { MdArrowBack } from "react-icons/md";
import { NavLink } from "react-router-dom";

import userIcon from "../../../../../assets/images/user.png";
import { PublicUserModel } from "../../../../../models/userModels";

type ConversationHeaderProps = {
  user: PublicUserModel;
};

export default function ConversationHeader(props: ConversationHeaderProps) {
  const { user } = props;

  return (
    <div className="flex items-center justify-between bg-primary p-4 text-primary-text md:gap-4">
      <div className="flex items-center gap-3">
        <img
          src={user.avatar ?? userIcon}
          alt="Avatar do usuário"
          className="h-10 w-10 rounded-full object-cover"
        />
        <span className="font-bold">{user.name}</span>
      </div>

      <NavLink
        to="/conversations"
        className="rounded-full bg-tertiary p-2 md:hidden"
      >
        <MdArrowBack className="h-4 w-4" />
      </NavLink>
    </div>
  );
}
