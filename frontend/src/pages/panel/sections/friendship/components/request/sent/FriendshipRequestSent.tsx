import { useState } from "react";

import { useSentFriendshipRequests } from "../../../../../../../hooks/useSentFriendshipRequests";
import { FriendshipRequestModel } from "../../../../../../../models/friendshipModels";
import { PublicUserModel } from "../../../../../../../models/userModels";
import SectionCard from "../../../../../components/section/SectionCard";
import SectionCardTitle from "../../../../../components/section/SectionCardTitle";
import RemoveFriendshipRequestDialog from "../../actions/RemoveFriendshipRequestDialog";
import EmptyDataMessage from "../../EmptyDataMessage";
import FriendshipRequestSentItem from "./FriendshipRequestSentItem";

type ToRemoveFriendshipRequestDataType = {
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
    useState<ToRemoveFriendshipRequestDataType>();

  function handleRemoveFriendshipRequest(
    toRemoveFriendshipRequestData: ToRemoveFriendshipRequestDataType
  ) {
    setOpenRemoveFriendshipRequestDialog(true);
    setToRemoveFriendshipRequestData(toRemoveFriendshipRequestData);
  }

  return (
    <>
      <SectionCard>
        <SectionCardTitle title="Enviados" />

        {data.length ? (
          data.map((friendshipRequest) => (
            <FriendshipRequestSentItem
              key={friendshipRequest.id}
              friendshipRequest={friendshipRequest}
              handleRemoveFriendshipRequest={handleRemoveFriendshipRequest}
            />
          ))
        ) : (
          <EmptyDataMessage message="Nenhum convite enviado pendente." />
        )}
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
