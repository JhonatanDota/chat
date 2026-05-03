import { MdChatBubbleOutline } from "react-icons/md";
import { useParams } from "react-router-dom";

import { useConversationsPreview } from "../../../../hooks/useConversationsPreview";
import ConversationChat from "./chat/ConversationChat";
import ConversationsPreview from "./ConversationsPreview";

export default function Conversation() {
  const { id } = useParams();
  const { data = [] } = useConversationsPreview();

  const user = data.find(
    (conversation) => conversation.id === Number(id)
  )?.user;

  const previewClassName = `${id ? "hidden md:flex" : "flex"} p-2 flex-col w-full md:w-96 lg:w-[28rem]`;
  const chatClassName = `${id ? "flex" : "hidden md:flex"} flex-1 flex-col md:border-l-[2px] md:border-primary`;

  return (
    <div className="flex h-screen">
      <div className={previewClassName}>
        <ConversationsPreview
          conversationsPreview={data}
          currentConversationId={Number(id)}
        />
      </div>

      <div className={chatClassName}>
        {id && user ? (
          <ConversationChat user={user} conversationId={Number(id)} />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-3 text-primary-text">
            <MdChatBubbleOutline className="h-16 w-16" />
            <span className="text-lg font-medium">
              Selecione uma conversa para começar
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
