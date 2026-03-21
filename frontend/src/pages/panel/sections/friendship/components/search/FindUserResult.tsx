import { useQueryClient } from "@tanstack/react-query";

import { useCheckFriendship } from "../../../../../../hooks/useCheckFriendship";
import { useRequestFriendship } from "../../../../../../hooks/useRequestFriendship";
import { PublicUserModel } from "../../../../../../models/userModels";
import Loader from "../../../../components/misc/Loader";
import UserBox from "../UserBox";

type SearchResultProps = {
  user: PublicUserModel;
};

export default function FindUserResult(props: SearchResultProps) {
  const { user } = props;

  const queryClient = useQueryClient();

  const {
    data: checkFriendship,
    refetch,
    isLoading: isLoadingCheckFriendship,
  } = useCheckFriendship(user.id);

  const { mutate, isPending: isPendingRequestFriendship } =
    useRequestFriendship();

  function requestFriendship() {
    mutate(user.id, {
      onSuccess: () => {
        refetch();
        queryClient.invalidateQueries({ queryKey: ["sentFriendshipRequests"] });
      },
    });
  }

  function renderAction() {
    if (isLoadingCheckFriendship) {
      return <Loader size="sm" />;
    }

    if (!checkFriendship) return null;

    if (checkFriendship.isFriend) {
      return (
        <button type="button" className="button-no-action" disabled>
          Já é seu(a) amigo(a)
        </button>
      );
    }

    if (checkFriendship.hasPendingFriendshipRequest) {
      return (
        <button type="button" className="button-no-action" disabled>
          Pedido de amizade pendente
        </button>
      );
    }

    return (
      <button
        type="button"
        className="button-action"
        disabled={isPendingRequestFriendship}
        onClick={requestFriendship}
      >
        Adicionar
      </button>
    );
  }

  return <UserBox user={user}>{renderAction()}</UserBox>;
}
