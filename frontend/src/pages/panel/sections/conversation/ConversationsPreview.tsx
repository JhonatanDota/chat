import { Link } from "react-router-dom";

import { ConversationPreviewModel } from "../../../../models/conversationModels";
import ConversationPreview from "./ConversationPreview";

type ConversationsPreviewProps = {
  conversationsPreview: ConversationPreviewModel[];
  currentConversationId?: number;
};

export default function ConversationsPreview(props: ConversationsPreviewProps) {
  const { conversationsPreview, currentConversationId } = props;

  return (
    <div className="flex max-h-full flex-col gap-3 overflow-y-auto">
      {conversationsPreview.map((conversationPreview) => (
        <Link
          key={conversationPreview.id}
          to={`/conversations/${conversationPreview.id}`}
        >
          <ConversationPreview
            conversationPreview={conversationPreview}
            isActiveConversation={
              currentConversationId === conversationPreview.id
            }
          />
        </Link>
      ))}
    </div>
  );
}
