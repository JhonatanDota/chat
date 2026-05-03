import { MessageModel } from "../../../../../models/conversationModels";
import { messageDate } from "../../../../../utils/date";

type ConversationMessagesProps = {
  messages: MessageModel[];
};

export default function ConversationMessages(props: ConversationMessagesProps) {
  const { messages } = props;

  return (
    <div className="flex-1 overflow-y-auto p-2">
      <div className="flex flex-col gap-5">
        {messages.map((message) => (
          <MessageBox key={message.id} message={message} />
        ))}
      </div>
    </div>
  );
}

type MessageBoxProps = {
  message: MessageModel;
};

function MessageBox(props: MessageBoxProps) {
  const {
    message: { content, isMine, createdAt },
  } = props;

  return (
    <div className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
      <div
        className={`flex max-w-[75%] gap-3 rounded-lg p-4 ${
          isMine ? "bg-tertiary" : "bg-secondary"
        }`}
      >
        <div className="flex flex-col gap-1 text-primary-text">
          <span>{content}</span>
          <span className="text-xs text-secondary-text">
            {messageDate(new Date(createdAt))}
          </span>
        </div>
      </div>
    </div>
  );
}
