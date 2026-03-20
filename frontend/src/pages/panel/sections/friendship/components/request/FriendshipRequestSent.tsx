import { useState } from "react";

import { useFindUser } from "../../../../../../hooks/useFindUser";
import { useSentFriendshipRequests } from "../../../../../../hooks/useSentFriendshipRequests";
import { FriendshipRequestModel } from "../../../../../../models/friendshipModels";
import { PublicUserModel } from "../../../../../../models/userModels";
import SectionCard from "../../../../components/section/SectionCard";
import SectionCardTitle from "../../../../components/section/SectionCardTitle";
import RemoveFriendshipRequestDialog from "../actions/RemoveFriendshipRequestDialog";
import UserBox from "../UserBox";
import UserBoxSkeleton from "../UserBoxSkeleton";

type toRemoveFriendshipRequestDataType = {
  friendshipRequest: FriendshipRequestModel;
  user: PublicUserModel;
};

export default function FriendshipRequestSent() {
  const [
    openRemoveFriendshipRequestDialog,
    setOpenRemoveFriendshipRequestDialog,
  ] = useState(false);
  const [toRemoveFriendshipRequestData, setToRemoveFriendshipRequestData] =
    useState<toRemoveFriendshipRequestDataType>();
  const { data = [] } = useSentFriendshipRequests();

  function handleRemoveFriendshipRequest(
    toRemoveFriendshipRequestData: toRemoveFriendshipRequestDataType
  ) {
    setOpenRemoveFriendshipRequestDialog(true);
    setToRemoveFriendshipRequestData(toRemoveFriendshipRequestData);
  }

  return (
    <>
      <SectionCard>
        <SectionCardTitle icon={<></>} title="Enviados" />
        {data.map((friendshipRequest) => (
          <FriendshipRequestSentItem
            key={friendshipRequest.id}
            friendshipRequest={friendshipRequest}
            handleRemoveFriendshipRequest={handleRemoveFriendshipRequest}
          />
        ))}
      </SectionCard>

      {openRemoveFriendshipRequestDialog && toRemoveFriendshipRequestData && (
        <RemoveFriendshipRequestDialog
          user={toRemoveFriendshipRequestData.user}
          friendshipRequest={toRemoveFriendshipRequestData.friendshipRequest}
          close={() => setOpenRemoveFriendshipRequestDialog(false)}
        />
      )}
    </>
  );
}

type FriendshipRequestSentItemProps = {
  friendshipRequest: FriendshipRequestModel;
  handleRemoveFriendshipRequest: (
    toRemoveFriendshipRequestData: toRemoveFriendshipRequestDataType
  ) => void;
};

function FriendshipRequestSentItem(props: FriendshipRequestSentItemProps) {
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
