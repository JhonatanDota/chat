import { useState } from "react";

import { FriendshipRequestStatusEnum } from "../../../../../../../enums/friendshipRequestEnum";
import { useReceivedFriendshipRequests } from "../../../../../../../hooks/useReceivedFriendshipRequests";
import { FriendshipRequestModel } from "../../../../../../../models/friendshipModels";
import { PublicUserModel } from "../../../../../../../models/userModels";
import SectionCard from "../../../../../components/section/SectionCard";
import SectionCardTitle from "../../../../../components/section/SectionCardTitle";
import RespondFriendshipRequestDialog from "../../actions/RespondFriendshipRequestDialog";
import EmptyDataMessage from "../../EmptyDataMessage";
import FriendshipRequestReceivedItem from "./FriendshipRequestReceivedItem";

type ToRespondFriendshipRequestDataType = {
  friendshipRequest: FriendshipRequestModel;
  user: PublicUserModel;
  status: FriendshipRequestStatusEnum;
};

export default function FriendshipRequestReceived() {
  const { data = [] } = useReceivedFriendshipRequests();

  const [
    openRespondFriendshipRequestDialog,
    setOpenRespondFriendshipRequestDialog,
  ] = useState(false);

  const [toRespondFriendshipRequestData, setToRespondFriendshipRequestData] =
    useState<ToRespondFriendshipRequestDataType>();

  function handleRespondFriendshipRequest(
    toRespondFriendshipRequestData: ToRespondFriendshipRequestDataType
  ) {
    setOpenRespondFriendshipRequestDialog(true);
    setToRespondFriendshipRequestData(toRespondFriendshipRequestData);
  }

  return (
    <>
      <SectionCard>
        <SectionCardTitle title="Recebidos" />

        {data.length ? (
          data.map((friendshipRequest) => (
            <FriendshipRequestReceivedItem
              key={friendshipRequest.id}
              friendshipRequest={friendshipRequest}
              handleRespondFriendshipRequest={handleRespondFriendshipRequest}
            />
          ))
        ) : (
          <EmptyDataMessage message="Nenhum convite recebido pendente." />
        )}
      </SectionCard>

      {openRespondFriendshipRequestDialog && toRespondFriendshipRequestData && (
        <RespondFriendshipRequestDialog
          user={toRespondFriendshipRequestData.user}
          friendshipRequest={toRespondFriendshipRequestData.friendshipRequest}
          status={toRespondFriendshipRequestData.status}
          close={() => setOpenRespondFriendshipRequestDialog(false)}
        />
      )}
    </>
  );
}
