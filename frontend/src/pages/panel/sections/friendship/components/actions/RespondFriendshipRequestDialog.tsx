import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { FriendshipRequestStatusEnum } from "../../../../../../enums/friendshipRequestEnum";
import { useRespondFriendshipRequest } from "../../../../../../hooks/useRespondFriendshipRequest";
import { FriendshipRequestModel } from "../../../../../../models/friendshipModels";
import { PublicUserModel } from "../../../../../../models/userModels";
import Dialog from "../../../../components/dialog/Dialog";
import DialogTitle from "../../../../components/dialog/DialogTitle";

type RespondFriendshipRequestDialogProps = {
  user: PublicUserModel;
  friendshipRequest: FriendshipRequestModel;
  status: FriendshipRequestStatusEnum;
  close: () => void;
};

export default function RespondFriendshipRequestDialog(
  props: RespondFriendshipRequestDialogProps
) {
  const { user, friendshipRequest, status, close } = props;

  const queryClient = useQueryClient();

  const { mutate, isPending } = useRespondFriendshipRequest();

  const messages = {
    action:
      status === FriendshipRequestStatusEnum.ACCEPTED ? "aceitar" : "recusar",
    result:
      status === FriendshipRequestStatusEnum.ACCEPTED ? "aceito" : "recusado",
  };

  function handleRespondFriendshipRequest() {
    mutate(
      {
        id: friendshipRequest.id,
        status,
      },
      {
        onSuccess: () => {
          close();
          toast.success(`Convite ${messages.result} com sucesso!`);

          queryClient.invalidateQueries({
            queryKey: ["checkFriendship", user.id],
          });

          queryClient.invalidateQueries({
            queryKey: ["receivedFriendshipRequests"],
          });

          if (status === FriendshipRequestStatusEnum.ACCEPTED) {
            queryClient.invalidateQueries({
              queryKey: ["friends"],
            });
          }
        },
      }
    );
  }

  return (
    <Dialog close={close}>
      <DialogTitle title="Responder Convite de Amizade" />

      <p className="text-sm text-secondary-text md:text-base">
        Tem certeza de que deseja{" "}
        <span className="font-bold text-primary-text">{messages.action}</span> o
        convite enviado por{" "}
        <span className="font-bold text-primary-text">{user.name}</span>?
      </p>

      <div className="actions-buttons-container">
        <button
          disabled={isPending}
          onClick={handleRespondFriendshipRequest}
          className="button-action col-span-2"
        >
          Confirmar
        </button>

        <button onClick={close} className="button-cancel-action">
          Cancelar
        </button>
      </div>
    </Dialog>
  );
}
