import { ConversationPreviewModel } from "../../../../models/conversationModels";
import UserBox from "../friendship/components/UserBox";

type ConversationPreviewProps = {
  conversationPreview: ConversationPreviewModel;
};

export default function ConversationPreview(props: ConversationPreviewProps) {
  const { conversationPreview } = props;

  return (
    <UserBox user={conversationPreview.user}>
      <div className="flex flex-col gap-1 text-primary-text">
        <span>{conversationPreview.lastMessage?.content}</span>
        <span className="self-end">
          {conversationPreview.lastMessage?.createdAt.toLocaleString()}
        </span>
      </div>
    </UserBox>
  );
}
