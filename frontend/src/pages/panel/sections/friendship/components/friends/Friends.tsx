import { useFriends } from "../../../../../../hooks/useFriends";
import EmptyDataMessage from "../EmptyDataMessage";
import UserBox from "../UserBox";

export default function Friends() {
  const { data = [] } = useFriends();

  return (
    <>
      {data.length ? (
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {data.map((user) => (
            <UserBox key={user.id} user={user} />
          ))}
        </div>
      ) : (
        <EmptyDataMessage message="Nenhum amigo(a) adicionado(a)." />
      )}
    </>
  );
}
