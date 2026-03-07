import { useCheckFriendship } from "../../../../../../hooks/useCheckFriendship";
import { PublicUserModel } from "../../../../../../models/userModels";
import { requestFriendship as requestFriendshipRequest } from "../../../../../../requests/friendshipRequests";
import { handleErrors } from "../../../../../../requests/handleErrors";
import Loader from "../../../../components/misc/Loader";
import UserBox from "../UserBox";

type SearchResultProps = {
  user: PublicUserModel;
};

export default function FindUserResult(props: SearchResultProps) {
  const { user } = props;

  const {
    data: checkFriendship,
    refetch,
    isLoading,
  } = useCheckFriendship(user.id);

  async function requestFriendship() {
    try {
      await requestFriendshipRequest({ toUserId: user.id });
      await refetch();
    } catch (error) {
      handleErrors(error);
    }
  }

  function renderAction() {
    if (isLoading) {
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
        disabled={isLoading}
        onClick={requestFriendship}
      >
        Adicionar
      </button>
    );
  }

  return <UserBox user={user}>{renderAction()}</UserBox>;
}
