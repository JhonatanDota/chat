import { useNavigate } from "react-router-dom";

import { ConversationPreviewModel } from "../../../../models/conversationModels";
import ConversationPreview from "./ConversationPreview";

type ConversationsPreviewProps = {
  conversationsPreview: ConversationPreviewModel[];
};

export default function ConversationsPreview(props: ConversationsPreviewProps) {
  const navigate = useNavigate();

  const { conversationsPreview } = props;

  return (
    <div className="flex cursor-pointer flex-col gap-2">
      {conversationsPreview.map((conversationPreview) => (
        <div
          onClick={() => navigate(`/conversations/${conversationPreview.id}`)}
          key={conversationPreview.id}
        >
          <ConversationPreview
            key={conversationPreview.id}
            conversationPreview={conversationPreview}
          />
        </div>
      ))}
    </div>
  );
}
