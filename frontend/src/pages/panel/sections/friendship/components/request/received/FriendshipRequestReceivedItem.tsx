import { MdClear, MdDone } from "react-icons/md";

import { FriendshipRequestStatusEnum } from "../../../../../../../enums/friendshipRequestEnum";
import { useFindUser } from "../../../../../../../hooks/useFindUser";
import { FriendshipRequestModel } from "../../../../../../../models/friendshipModels";
import { PublicUserModel } from "../../../../../../../models/userModels";
import UserBox from "../../UserBox";
import UserBoxSkeleton from "../../UserBoxSkeleton";

type FriendshipRequestReceivedItemProps = {
  friendshipRequest: FriendshipRequestModel;
  handleRespondFriendshipRequest: (toRespondFriendshipRequestData: {
    friendshipRequest: FriendshipRequestModel;
    user: PublicUserModel;
    status: FriendshipRequestStatusEnum;
  }) => void;
};

export default function FriendshipRequestReceivedItem(
  props: FriendshipRequestReceivedItemProps
) {
  const { friendshipRequest, handleRespondFriendshipRequest } = props;

  const { data: user, isLoading } = useFindUser(friendshipRequest.fromUserId);

  if (isLoading || !user) {
    return <UserBoxSkeleton />;
  }

  return (
    <UserBox user={user}>
      <div className="flex gap-3">
        <button
          onClick={() =>
            handleRespondFriendshipRequest({
              friendshipRequest,
              user,
              status: FriendshipRequestStatusEnum.ACCEPTED,
            })
          }
          type="button"
          className="button-action"
        >
          <MdDone />
        </button>

        <button
          onClick={() =>
            handleRespondFriendshipRequest({
              friendshipRequest,
              user,
              status: FriendshipRequestStatusEnum.DECLINED,
            })
          }
          type="button"
          className="button-cancel-action"
        >
          <MdClear />
        </button>
      </div>
    </UserBox>
  );
}
