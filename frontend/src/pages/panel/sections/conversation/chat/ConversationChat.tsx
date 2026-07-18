import { useMemo } from "react";

import { useConversationMessages } from "../../../../../hooks/useConversationMessages";
import { useMe } from "../../../../../hooks/useMe";
import { PublicUserModel } from "../../../../../models/userModels";
import ConversationFooter from "./ConversationFooter";
import ConversationHeader from "./ConversationHeader";
import ConversationMessages from "./ConversationMessages";

type ConversationChatProps = {
  user: PublicUserModel;
  conversationId: number;
};

export default function ConversationChat(props: ConversationChatProps) {
  const { user, conversationId } = props;

  const { data: me } = useMe();

  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useConversationMessages(conversationId);

  const messages = useMemo(() => {
    return data?.pages.flatMap((page) => page.data).reverse() ?? [];
  }, [data]);

  return (
    <div className="flex h-full flex-col">
      <ConversationHeader user={user} />

      {me && (
        <ConversationMessages
          me={me}
          messages={messages}
          fetchNextPage={fetchNextPage}
          isFetchingNextPage={isFetchingNextPage}
          hasNextPage={hasNextPage}
        />
      )}

      <ConversationFooter conversationId={conversationId} />
    </div>
  );
}
