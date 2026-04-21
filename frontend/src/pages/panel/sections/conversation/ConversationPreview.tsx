import userIcon from "../../../../assets/images/user.png";
import { ConversationPreviewModel } from "../../../../models/conversationModels";
import { toISOStringBr } from "../../../../utils/date";

type ConversationPreviewProps = {
  conversationPreview: ConversationPreviewModel;
  isActiveConversation: boolean;
};

export default function ConversationPreview(props: ConversationPreviewProps) {
  const {
    conversationPreview: { user, lastMessage },
    isActiveConversation,
  } = props;

  const activeConversationClassName = `${isActiveConversation && "bg-secondary border-primary"}`;

  return (
    <div
      className={`flex items-center gap-3 rounded-md border-2 border-secondary p-2 text-primary-text transition-colors ${activeConversationClassName}`}
    >
      <img
        src={user.avatar ?? userIcon}
        alt="Avatar do usuário"
        className="h-12 w-12 rounded-full object-cover md:h-14 md:w-14"
      />

      <div className="flex min-w-0 flex-col gap-1">
        <span className="text-base font-bold">{user.name}</span>
        <span className="truncate text-sm font-medium text-secondary-text md:text-base">
          {lastMessage?.content}
        </span>
      </div>

      {lastMessage && (
        <span className="ml-auto self-start text-xs font-medium text-secondary-text md:text-sm">
          {lastMessage ? toISOStringBr(lastMessage.createdAt) : "-"}
        </span>
      )}
    </div>
  );
}
