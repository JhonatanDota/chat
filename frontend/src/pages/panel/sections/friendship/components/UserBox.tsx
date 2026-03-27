import { ReactNode } from "react";

import userIcon from "../../../../../assets/images/user.png";
import { PublicUserModel } from "../../../../../models/userModels";

type UserBoxProps = {
  user: PublicUserModel;
  children?: ReactNode;
};

export default function UserBox(props: UserBoxProps) {
  const { user, children } = props;
  return (
    <div className="flex flex-col gap-3 rounded-md border-2 border-secondary bg-primary p-3 md:flex-row md:justify-between">
      <div className="flex items-center gap-3">
        <img
          src={user.avatar ?? userIcon}
          alt="Avatar do usuário"
          className="h-12 w-12 rounded-full object-cover"
        />

        <div className="flex min-w-0 flex-col">
          <span className="truncate font-bold text-primary-text">
            {user.name}
          </span>
          <span className="text-xs text-secondary-text">@{user.username}</span>
        </div>
      </div>

      <div className="self-end md:self-center">{children && children}</div>
    </div>
  );
}
