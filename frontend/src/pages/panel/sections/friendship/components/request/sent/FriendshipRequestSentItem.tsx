import { useFindUser } from "../../../../../../../hooks/useFindUser";
import { FriendshipRequestModel } from "../../../../../../../models/friendshipModels";
import { PublicUserModel } from "../../../../../../../models/userModels";
import UserBox from "../../UserBox";
import UserBoxSkeleton from "../../UserBoxSkeleton";

type FriendshipRequestSentItemProps = {
  friendshipRequest: FriendshipRequestModel;
  handleRemoveFriendshipRequest: (toRemoveFriendshipRequestData: {
    friendshipRequest: FriendshipRequestModel;
    user: PublicUserModel;
  }) => void;
};

export default function FriendshipRequestSentItem(
  props: FriendshipRequestSentItemProps
) {
  const { friendshipRequest, handleRemoveFriendshipRequest } = props;

  const { data: user, isLoading } = useFindUser(friendshipRequest.toUserId);

  if (isLoading || !user) {
    return <UserBoxSkeleton />;
  }

  return (
    <UserBox user={user}>
      <button
        onClick={() => {
          handleRemoveFriendshipRequest({
            friendshipRequest,
            user,
          });
        }}
        type="button"
        className="button-cancel-action"
      >
        Remover Convite
      </button>
    </UserBox>
  );
}
