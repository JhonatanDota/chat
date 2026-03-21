import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { useRemoveFriendshipRequest } from "../../../../../../hooks/useRemoveFriendshipRequest";
import { FriendshipRequestModel } from "../../../../../../models/friendshipModels";
import { PublicUserModel } from "../../../../../../models/userModels";
import Dialog from "../../../../components/dialog/Dialog";
import DialogTitle from "../../../../components/dialog/DialogTitle";

type RemoveFriendshipRequestDialogProps = {
  user: PublicUserModel;
  friendshipRequest: FriendshipRequestModel;
  close: () => void;
};

export default function RemoveFriendshipRequestDialog(
  props: RemoveFriendshipRequestDialogProps
) {
  const { user, friendshipRequest, close } = props;

  const queryClient = useQueryClient();

  const { mutate, isPending } = useRemoveFriendshipRequest();

  function handleRemoveFriendshipRequest() {
    mutate(friendshipRequest, {
      onSuccess: () => {
        close();
        toast.success("Convite removido com sucesso!");

        queryClient.invalidateQueries({
          queryKey: ["checkFriendship", user.id],
        });

        queryClient.invalidateQueries({
          queryKey: ["sentFriendshipRequests"],
        });
      },
    });
  }

  return (
    <Dialog close={close}>
      <DialogTitle title="Excluir Convite de Amizade" />

      <p className="text-sm text-secondary-text md:text-base">
        Tem certeza de que deseja remover o convite de amizade enviado para{" "}
        <span className="font-bold text-primary-text">{user.name}</span>?
      </p>

      <div className="actions-buttons-container">
        <button
          disabled={isPending}
          onClick={handleRemoveFriendshipRequest}
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
