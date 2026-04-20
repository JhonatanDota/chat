type ConversationChatProps = {
  conversationId: number;
};

export default function ConversationChat(props: ConversationChatProps) {
  const { conversationId } = props;

  return <div className="text-white">ConversationChat {conversationId}</div>;
}
