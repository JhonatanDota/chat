import { useState } from "react";

import { useSentFriendshipRequests } from "../../../../../../../hooks/useSentFriendshipRequests";
import { FriendshipRequestModel } from "../../../../../../../models/friendshipModels";
import { PublicUserModel } from "../../../../../../../models/userModels";
import SectionCard from "../../../../../components/section/SectionCard";
import SectionCardTitle from "../../../../../components/section/SectionCardTitle";
import RemoveFriendshipRequestDialog from "../../actions/RemoveFriendshipRequestDialog";
import FriendshipRequestSentItem from "./FriendshipRequestSentItem";

type toRemoveFriendshipRequestDataType = {
  friendshipRequest: FriendshipRequestModel;
  user: PublicUserModel;
};

export default function FriendshipRequestSent() {
  const { data = [] } = useSentFriendshipRequests();

  const [
    openRemoveFriendshipRequestDialog,
    setOpenRemoveFriendshipRequestDialog,
  ] = useState(false);

  const [toRemoveFriendshipRequestData, setToRemoveFriendshipRequestData] =
    useState<toRemoveFriendshipRequestDataType>();

  function handleRemoveFriendshipRequest(
    toRemoveFriendshipRequestData: toRemoveFriendshipRequestDataType
  ) {
    setOpenRemoveFriendshipRequestDialog(true);
    setToRemoveFriendshipRequestData(toRemoveFriendshipRequestData);
  }

  return (
    <>
      <SectionCard>
        <SectionCardTitle title="Enviados" />
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
