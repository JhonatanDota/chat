import { useEffect, useRef } from "react";
import useInfiniteScroll from "react-infinite-scroll-hook";

import { MeModel } from "../../../../../models/authModels";
import { MessageModel } from "../../../../../models/conversationModels";
import { messageDate } from "../../../../../utils/date";

type ConversationMessagesProps = {
  me: MeModel;
  messages: MessageModel[];
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
};

export default function ConversationMessages(props: ConversationMessagesProps) {
  const { me, messages, fetchNextPage, hasNextPage, isFetchingNextPage } =
    props;

  const scrollRef = useRef<HTMLDivElement>(null);

  const [sentryRef] = useInfiniteScroll({
    loading: isFetchingNextPage,
    hasNextPage,
    onLoadMore: fetchNextPage,
    disabled: false,
    rootMargin: "100px",
  });

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className="flex flex-1 flex-col-reverse overflow-y-auto p-2">
      <div className="flex-reverse flex flex-col gap-2">
        <div ref={sentryRef} />
        {messages.map((message) => (
          <MessageBox key={message.id} me={me} message={message} />
        ))}
      </div>

      <div ref={scrollRef} />
    </div>
  );
}

type MessageBoxProps = {
  me: MeModel;
  message: MessageModel;
};

function MessageBox(props: MessageBoxProps) {
  const {
    me,
    message: { userId, content, createdAt },
  } = props;

  const isMine = userId === me.id;

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
