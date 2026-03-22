import FriendshipRequestReceived from "./received/FriendshipRequestReceived";
import FriendshipRequestSent from "./sent/FriendshipRequestSent";

export default function FriendshipRequest() {
  return (
    <div className="grid gap-2 lg:grid-cols-2">
      <FriendshipRequestSent />
      <FriendshipRequestReceived />
    </div>
  );
}
