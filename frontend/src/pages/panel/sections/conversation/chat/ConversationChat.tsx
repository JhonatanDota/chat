import { useMemo } from "react";

import { useConversationMessages } from "../../../../../hooks/useConversationMessages";
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

  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useConversationMessages(conversationId.toString());

  const messages = useMemo(() => {
    return data?.pages.flatMap((page) => page.data).reverse() ?? [];
  }, [data]);

  return (
    <div className="flex h-full flex-col">
      <ConversationHeader user={user} />
      <ConversationMessages
        messages={messages}
        fetchNextPage={fetchNextPage}
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}
      />
      <ConversationFooter />
    </div>
  );
}
