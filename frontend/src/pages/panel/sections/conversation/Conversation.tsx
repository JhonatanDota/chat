import { MdChatBubbleOutline } from "react-icons/md";
import { useParams } from "react-router-dom";

import { useConversationsPreview } from "../../../../hooks/useConversationsPreview";
import ConversationChat from "./ConversationChat";
import ConversationsPreview from "./ConversationsPreview";

export default function Conversation() {
  const { id } = useParams();
  const { data = [] } = useConversationsPreview();

  const previewClassName = `${id ? "hidden md:flex" : "flex"} border-r-[2px] border-secondary p-2 flex-col w-full md:w-96 lg:w-[28rem]`;
  const chatClassName = `${id ? "flex" : "hidden md:flex"} flex-1 flex-col`;

  return (
    <div className="flex h-screen gap-2">
      <div className={previewClassName}>
        <ConversationsPreview
          conversationsPreview={data}
          currentConversationId={Number(id)}
        />
      </div>

      <div className={chatClassName}>
        {id ? (
          <ConversationChat conversationId={Number(id)} />
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
